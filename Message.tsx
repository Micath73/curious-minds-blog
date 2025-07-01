
import React from 'react';
import type { ChatMessage } from '../../types';
import LogoIcon from '../icons/LogoIcon';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 my-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      {isModel && <LogoIcon className="w-8 h-8 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" />}
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
          isModel
            ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-blue-600 text-white'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;