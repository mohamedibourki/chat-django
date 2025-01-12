import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm p-4"
    >
      <div className="flex items-center space-x-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 bg-white shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder:text-gray-400 text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl p-2.5 hover:bg-blue-700 
            shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}