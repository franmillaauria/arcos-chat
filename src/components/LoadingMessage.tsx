import { useState, useEffect } from "react";

interface LoadingMessageProps {
  isLoading: boolean;
}

export const LoadingMessage = ({ isLoading }: LoadingMessageProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messageSet, setMessageSet] = useState(0);
  
  const initialMessages = [
    "Dame un segundo, por favor",
    "Un momento, estoy pensando…",
    "Estoy en ello, no tardo nada."
  ];
  
  const extendedMessages = [
    "Estoy cocinando una buena respuesta para ti...",
    "Esto va a fuego lento… pero sale bien.",
    "Estoy afilando la mejor recomendación.",
    "Estoy echando un vistazo al almacén..."
  ];
  
  const currentMessages = messageSet === 0 ? initialMessages : extendedMessages;

  useEffect(() => {
    if (!isLoading) {
      setCurrentMessageIndex(0);
      setMessageSet(0);
      return;
    }

    // Switch to extended messages after 10 seconds
    const switchTimer = setTimeout(() => {
      setMessageSet(1);
      setCurrentMessageIndex(0);
    }, 10000);

    return () => clearTimeout(switchTimer);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % currentMessages.length
      );
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(messageTimer);
  }, [isLoading, currentMessages.length]);

  if (!isLoading) return null;

  return (
    <div className="flex justify-start mb-8">
      <div className="max-w-[95%] w-full">
        <div className="bg-muted rounded-2xl rounded-tl-md px-6 py-4">
          <div className="flex items-center space-x-3">
            {/* Animated dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            {/* Loading message */}
            <p className="text-foreground/80 text-sm animate-fade-in">
              {currentMessages[currentMessageIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};