"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Settings, LogOut, Users, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const DUMMY_USERS = [
  { id: "1", name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", status: "online", lastMessage: "Hey, how are you?" },
  { id: "2", name: "Bob Smith", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100", status: "offline", lastMessage: "See you tomorrow!" },
  { id: "3", name: "Carol White", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", status: "online", lastMessage: "Thanks for the help!" },
  { id: "4", name: "David Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", status: "away", lastMessage: "Let's meet at 3 PM" },
];

interface ChatListProps {
  onSelectUser: (userId: string) => void;
  selectedUser: string | null;
}

export function ChatList({ onSelectUser, selectedUser }: ChatListProps) {
  const router = useRouter();

  const ChatListContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Your avatar" />
          </Avatar>
          <span className="font-medium">Your Name</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" /> Archived
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/")} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {DUMMY_USERS.map((user) => (
            <Button
              key={user.id}
              variant="ghost"
              className={`w-full justify-start px-2 py-6 ${
                selectedUser === user.id ? "bg-accent" : ""
              }`}
              onClick={() => onSelectUser(user.id)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 mr-4">
                  <img src={user.avatar} alt={user.name} />
                </Avatar>
                <span className={`absolute bottom-0 right-3 h-3 w-3 rounded-full border-2 border-background ${
                  user.status === "online" ? "bg-green-500" :
                  user.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                }`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium truncate">{user.name}</p>
                  <span className="text-xs text-muted-foreground">12:30 PM</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Users className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetHeader className="sr-only">
              <SheetTitle>Chat List</SheetTitle>
            </SheetHeader>
            <ChatListContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block w-80 border-r bg-card">
        <ChatListContent />
      </div>
    </>
  );
}