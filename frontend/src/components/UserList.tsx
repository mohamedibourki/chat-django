import React from 'react';
import { User, Message } from '../types';
import { Users } from 'lucide-react';

interface UserListProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
  messages: Message[];
  currentUserId: string;
}

export function UserList({ users, selectedUserId, onSelectUser, messages, currentUserId }: UserListProps) {
  const getLastMessage = (userId: string) => {
    const userMessages = messages.filter(
      m => (m.sender.id === userId && m.receiver.id === currentUserId) ||
           (m.sender.id === currentUserId && m.receiver.id === userId)
    );
    if (userMessages.length === 0) return '';
    const lastMessage = userMessages[userMessages.length - 1];
    return lastMessage.content.length > 25 
      ? lastMessage.content.substring(0, 25) + '...'
      : lastMessage.content;
  };

  return (
    <div className="w-[300px] lg:w-[340px] bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center px-2">
          <Users className="w-5 h-5 text-blue-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-1">
          {users.filter(user => user.id !== currentUserId).map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200
                ${selectedUserId === user.id
                  ? 'bg-blue-50 shadow-sm'
                  : 'hover:bg-gray-50'
                }
              `}
              onClick={() => onSelectUser(user.id)}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full ring-2 ring-white"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white
                    ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}
                  `}
                />
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span className="text-xs font-medium text-gray-400">
                    {messages.some(m => 
                      (m.sender.id === user.id || m.receiver.id === user.id) &&
                      new Date(m.timestamp).toDateString() === new Date().toDateString()
                    ) 
                      ? new Date(messages.find(m => 
                          (m.sender.id === user.id || m.receiver.id === user.id)
                        )?.timestamp || '').toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {getLastMessage(user.id)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}