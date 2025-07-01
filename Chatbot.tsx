
import React, { useState, useEffect, useRef } from 'react';
import { startChatSession, sendMessageToChat } from '../../services/geminiService';
import type { ChatMessage as ChatMessageType } from '../../types';
import ChatIcon from './ChatIcon';
import Message from './Message';

const TypingIndicator = () => (
    <div className="flex items-center gap-1.5 ml-12 my-4">
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
);

const SuggestedPrompts = ({ onSend }: { onSend: (prompt: string) => void }) => {
    const prompts = ["Tell me about AI", "What's a fun history fact?", "Suggest an article"];
    return (
        <div className="p-4 flex flex-wrap gap-2 justify-center">
            {prompts.map(p => (
                <button
                    key={p}
                    onClick={() => onSend(p)}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      startChatSession()
        .then(initialMessage => {
          setMessages([{ role: 'model', text: initialMessage }]);
        })
        .catch(err => {
          console.error("Failed to start chat:", err);
          setMessages([{ role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (prompt?: string) => {
    const textToSend = prompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessageType = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!prompt) {
        setInput('');
    }
    setIsLoading(true);

    try {
      const responseText = await sendMessageToChat(textToSend);
      const modelMessage: ChatMessageType = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage: ChatMessageType = { role: 'model', text: "Apologies, something went wrong. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-[calc(100%-2.5rem)] sm:w-96 h-[70vh] sm:h-[600px] z-50 animate-pop-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col h-full border border-gray-200 dark:border-gray-700">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg shadow-md">
              <h3 className="font-bold text-lg">Curio, your AI Guide</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-2xl leading-none">&times;</button>
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, index) => (
                <Message key={index} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && !isLoading && <SuggestedPrompts onSend={(p) => handleSend(p)} />}

            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 border-t bg-white dark:bg-gray-800 dark:border-gray-700 rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 border bg-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 text-white p-2.5 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;