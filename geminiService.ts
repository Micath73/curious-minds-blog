

import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// The API key is obtained exclusively from the environment variable `process.env.API_KEY`.
// It is assumed to be pre-configured and accessible in the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a summary for a given text using the Gemini API.
 * @param text The text to summarize.
 * @returns A promise that resolves to the summarized text.
 */
export const summarizeText = async (text: string): Promise<string> => {
  const prompt = `Summarize the following article in 3-5 concise bullet points. Focus on the key takeaways and main arguments. Here is the article:\n\n---\n\n${text}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        temperature: 0.3,
        topP: 0.9,
        topK: 32,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary from the AI model.");
  }
};

let chat: Chat | null = null;

const getChat = (): Chat => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash-preview-04-17',
            config: {
                systemInstruction: `You are "Curio", a friendly and enthusiastic AI guide for the 'Curious Minds' blog. Your personality is curious, helpful, and a little bit playful. Your goal is to make users feel welcome and help them discover interesting content and features.
                
                - **Initial Greeting:** Start with a warm, energetic welcome. For example: "Hello there! Welcome to Curious Minds, a place for hungry brains and inquisitive souls! 👋"
                - **Introduce the Blog:** Briefly explain that the blog covers science, history, tech, and more.
                - **Engage the User:** Proactively ask them what they're curious about today. You can suggest topics like "ancient history," "the future of AI," or "the mysteries of space." You should also mention they can ask about our latest articles!
                - **Answering Questions:** When asked a question, provide a clear and concise answer. If it relates to a blog topic, suggest they read an article by name if you can.
                - **Explain Features:**
                  - If asked about creating posts, explain: "You can share your own knowledge! Just sign up for an account. Once our admin team approves your registration, you'll be able to use the 'Create Post' page to write and submit your own articles."
                  - If asked about comments, explain: "Yes, you can join the conversation! Just log in to your account and you'll find a comment section at the bottom of every article. Your comments are reviewed by our team to keep the discussion friendly and constructive."
                - **Keep it Snappy:** Use emojis to add personality, but don't overdo it. Keep responses relatively short and easy to read.`,
            },
        });
    }
    return chat;
}

/**
 * Starts a new chat session and gets the initial welcome message.
 * @returns A promise that resolves to the initial welcome message from the AI.
 */
export const startChatSession = async (): Promise<string> => {
    const chatInstance = getChat();
    // A simple opener triggers the detailed system instruction for the first message.
    const response = await chatInstance.sendMessage({ message: "Hello, introduce yourself." });
    return response.text;
}

/**
 * Sends a user's message to the ongoing chat session.
 * @param message The user's message.
 * @returns A promise that resolves to the AI's response.
 */
export const sendMessageToChat = async (message: string): Promise<string> => {
    const chatInstance = getChat();
    const response = await chatInstance.sendMessage({ message });
    return response.text;
}