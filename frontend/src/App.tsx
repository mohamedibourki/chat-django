import { useState } from 'react';
import { MessageInput } from './components/MessageInput';
import { ChatMessage } from './components/ChatMessage';
import { UserList } from './components/UserList';
import { Message, User } from './types';
import { Menu, X } from 'lucide-react';

const currentUser: User = {
  id: '1',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  isOnline: true,
};

const initialUsers: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isOnline: true,
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hey there! How are you?',
    sender: initialUsers[1],
    receiver: currentUser,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    content: "I'm doing great, thanks for asking!",
    sender: currentUser,
    receiver: initialUsers[1],
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: '3',
    content: 'Did you check the latest project updates?',
    sender: initialUsers[2],
    receiver: currentUser,
    timestamp: new Date(Date.now() - 2000000).toISOString(),
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users] = useState<User[]>(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<string>(initialUsers[1].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleSendMessage = (content: string) => {
    if (!selectedUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: currentUser,
      receiver: selectedUser,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsSidebarOpen(false);
  };

  const filteredMessages = messages.filter(
    message =>
      (message.sender.id === selectedUserId && message.receiver.id === currentUser.id) ||
      (message.sender.id === currentUser.id && message.receiver.id === selectedUserId)
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-0 lg:relative lg:translate-x-0 transform transition-all duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:block ${isSidebarOpen ? 'block' : 'hidden'}
        `}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
        <div className="relative z-50 h-full shadow-2xl lg:shadow-xl">
          <UserList 
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={handleSelectUser}
            messages={messages}
            currentUserId={currentUser.id}
          />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 shadow-sm">
          <div className="flex items-center ml-12 lg:ml-0">
            {selectedUser && (
              <>
                <div className="relative">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full ring-2 ring-white"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {selectedUser.name}
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    {selectedUser.isOnline ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.sender.id === currentUser.id}
            />
          ))}
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;