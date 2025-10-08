import React from 'react';
import { Bot, User } from 'lucide-react';

const Message = ({ text, isUser, isTyping }) => {
  if (isTyping) {
    return (
      <div className={`flex items-end space-x-3 max-w-lg`}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Bot className="text-white" />
        </div>
        <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg rounded-bl-none">
          <div className="flex items-center justify-center space-x-1">
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end max-w-lg ${isUser ? 'ml-auto flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-gray-600 dark:bg-gray-500' : 'bg-blue-500'}`}>
            {isUser ? <User className="text-white"/> : <Bot className="text-white"/>}
        </div>
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Message;
