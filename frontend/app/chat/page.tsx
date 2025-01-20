"use client";

import { useState } from "react";
import { ChatList } from "@/components/chat-list";
import { ChatWindow } from "@/components/chat-window";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <ChatList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        {selectedUser ? (
          <ChatWindow selectedUser={selectedUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}