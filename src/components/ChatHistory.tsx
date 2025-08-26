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
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // Only scroll when a new message is added (not during loading)
    if (messages.length > 0 && !isLoading) {
      scrollToLastMessage();
    }
  }, [messages.length, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div key={msg.id} ref={index === messages.length - 1 ? lastMessageRef : undefined}>
          <ChatMessage
            type={msg.type}
            message={msg.message}
            products={msg.products}
            closing={msg.closing}
            timestamp={msg.timestamp}
          />
        </div>
      ))}
      
      <LoadingMessage isLoading={isLoading} />
      
      <div ref={messagesEndRef} />
    </div>
  );
};