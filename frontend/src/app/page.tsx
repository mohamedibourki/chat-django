"use client"
import { useState, useEffect, useRef } from "react";

const ChatMessage = ({ message }: { message: string }) => (
  <div className="p-2 bg-gray-100 rounded mb-2">
    <p>{message}</p>
  </div>
);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const chatSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const chatSocket = new WebSocket("ws://localhost:8000/ws/socket-server/");
    chatSocketRef.current = chatSocket;

    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    chatSocket.onclose = () => {
      console.log("WebSocket closed, attempting to reconnect...");
      setTimeout(() => {
        chatSocketRef.current = new WebSocket("ws://localhost:8000/ws/socket-server/");
      }, 1000);
    };

    return () => {
      chatSocket.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatSocketRef.current && chatSocketRef.current.readyState === WebSocket.OPEN) {
      chatSocketRef.current.send(JSON.stringify({ message }));
      setMessage("");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}