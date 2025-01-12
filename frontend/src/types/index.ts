export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage?: string;
}