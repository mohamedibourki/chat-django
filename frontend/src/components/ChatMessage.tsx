import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isOwnMessage && (
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="w-8 h-8 rounded-full ring-2 ring-white mr-2"
        />
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm
          ${isOwnMessage
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
          }
        `}
      >
        {!isOwnMessage && (
          <p className="text-xs font-medium text-gray-600 mb-1">{message.sender.name}</p>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs text-right mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}