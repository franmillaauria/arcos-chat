import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { LoadingMessage } from "./LoadingMessage";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
}

interface ChatMessageData {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  products?: Product[];
  closing?: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: ChatMessageData[];
  isLoading: boolean;
}

export const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          type={msg.type}
          message={msg.message}
          products={msg.products}
          closing={msg.closing}
          timestamp={msg.timestamp}
        />
      ))}
      
      <LoadingMessage isLoading={isLoading} />
      
      <div ref={messagesEndRef} />
    </div>
  );
};