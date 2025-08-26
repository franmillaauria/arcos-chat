import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatHistory } from "@/components/ChatHistory";
import { useToast } from "@/hooks/use-toast";
import productWallet from "@/assets/product-wallet.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productBelt from "@/assets/product-belt.jpg";
import productBag from "@/assets/product-bag.jpg";

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

const Answer = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const location = useLocation();
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.helloauria.com/webhook/21fefe19-021f-42fe-b6f6-a5a04043fd69";

  // Default products to show
  const defaultProducts = [
    {
      id: "1",
      title: "Premium Leather Wallet",
      price: "129,99 €",
      image: productWallet,
      link: "/products/wallet"
    },
    {
      id: "2", 
      title: "Artisan Watch Collection",
      price: "899,99 €",
      image: productWatch,
      link: "/products/watch"
    },
    {
      id: "3",
      title: "Handcrafted Belt",
      price: "79,99 €", 
      image: productBelt,
      link: "/products/belt"
    },
    {
      id: "4",
      title: "Luxury Travel Bag",
      price: "459,99 €", 
      image: productBag, 
      link: "/products/bag"
    }
  ];

  // Check if we have data from navigation (from hero page)
  useEffect(() => {
    if (location.state?.question) {
      const { question, response, isLoading: navigationLoading } = location.state;
      
      // Add user message immediately
      const userMessage: ChatMessageData = {
        id: '1',
        type: 'user',
        message: question,
        timestamp: new Date()
      };
      
      setMessages([userMessage]);
      
      // If we have a response already, add it
      if (response) {
        const assistantMessage: ChatMessageData = {
          id: '2',
          type: 'assistant',
          message: response.answer || response.response || response.text || "No se recibió respuesta del asistente.",
          products: response.products || defaultProducts,
          closing: response.closing,
          timestamp: new Date()
        };
        setMessages([userMessage, assistantMessage]);
      } else if (navigationLoading) {
        // Start loading and make API call
        setIsLoading(true);
        handleApiCall(question);
      }
    }
  }, [location.state]);

  const handleApiCall = async (question: string) => {
    try {
      console.log("Making request to:", N8N_WEBHOOK_URL);
      
      const requestBody = {
        text: question
      };
      
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const responseText = await response.text();
        
        if (!responseText.trim()) {
          throw new Error("El webhook no devolvió respuesta");
        }
        
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          throw new Error("Respuesta inválida del servidor");
        }
        
        // Handle the structure {output: {response: "...", products: []}}
        let output;
        if (result.output) {
          output = result.output;
        } else if (Array.isArray(result) && result[0]?.output) {
          output = result[0].output;
        } else {
          output = result;
        }
        
        if (!output) {
          throw new Error("Respuesta inválida del servidor - no se encontró output");
        }
        
        // Transform products to match internal format
        const transformedProducts = output.products?.map((product: any, index: number) => ({
          id: `${index + 1}`,
          title: product.name,
          price: `${product.price} €`,
          image: product.image,
          link: product.link || `/products/${product.name?.toLowerCase().replace(/\s+/g, '-')}`,
          brand: product.serie || "Arcos"
        })) || [];
        
        // Add assistant response to chat
        const assistantMessage: ChatMessageData = {
          id: Date.now().toString() + '_response',
          type: 'assistant',
          message: output.response || `Respuesta a: "${question}"`,
          products: transformedProducts.length > 0 ? transformedProducts : undefined,
          closing: output.closing,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
      } else {
        throw new Error(`Error del servidor: ${response.status}`);
      }
    } catch (err: any) {
      console.error("Error calling n8n webhook:", err);
      
      let errorMessage = "No se pudo conectar con el asistente.";
      
      if (err.name === 'AbortError') {
        errorMessage = "El asistente tardó demasiado en responder. Inténtalo de nuevo.";
      } else if (err.message?.includes('Failed to fetch')) {
        errorMessage = "Error de conexión. Verifica tu conexión a internet.";
      } else if (err.message?.includes('webhook')) {
        errorMessage = "El asistente no está disponible temporalmente.";
      } else {
        errorMessage = err.message || "Error desconocido al conectar con el asistente.";
      }
      
      setError(errorMessage);
      toast({
        title: "Error de conexión",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    
    // Add user message to chat
    const userChatMessage: ChatMessageData = {
      id: Date.now().toString(),
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userChatMessage]);
    setInputValue("");
    setIsLoading(true); // Start loading immediately
    setError(null);
    
    // Call the API
    await handleApiCall(userMessage);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-32">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Chat History */}
          <div 
            className="mb-12"
            role="main"
            aria-live="polite"
            aria-label="Chat Conversation"
          >
            {messages.length === 0 && !isLoading ? (
              <div className="text-center text-muted-foreground py-12">
                <p>¡Hola! Pregúntame lo que quieras sobre nuestros productos.</p>
              </div>
            ) : (
              <ChatHistory messages={messages} isLoading={isLoading} />
            )}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Input - Simple without translucent background */}
      <div className="fixed bottom-0 left-0 right-0 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-3 pb-4">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about our products..."
                className="min-h-[55px] h-[12px] max-h-[120px] rounded-full resize-none px-6 py-1 pr-14 text-base border-2 focus:border-primary"
                aria-label="Ask a question about our products"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              size="lg"
              className="h-[32px] w-[32px] rounded-full p-0 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;