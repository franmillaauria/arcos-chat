import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductGrid } from "@/components/ProductGrid";
import { ResponseSkeleton } from "@/components/ResponseSkeleton";
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

interface AnswerData {
  text: string;
  products?: Product[];
}

const Answer = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.asistentesinnova.com/webhook/ecd5f122-250e-4db6-ab5a-98060c92d986";

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
    if (location.state?.response) {
      const { question, response } = location.state;
      console.log("Received from navigation:", { question, response });
      
      setAnswerData({
        text: response.answer || response.text || response.message || "Respuesta recibida del asistente.",
        products: response.products || defaultProducts
      });
    }
  }, [location.state]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    setError(null);
    console.log("Sending question to n8n:", inputValue);
    
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputValue,
          timestamp: new Date().toISOString(),
          source: "answer_page"
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("n8n response:", result);
        
        setAnswerData({
          text: result.answer || result.text || result.message || `Respuesta a: "${inputValue}"`,
          products: result.products || defaultProducts
        });
        
        setInputValue("");
        
        toast({
          title: "Respuesta recibida",
          description: "El asistente ha respondido tu pregunta.",
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error calling n8n webhook:", err);
      setError("No se pudo conectar con el asistente. Por favor, inténtalo de nuevo.");
      toast({
        title: "Error",
        description: "No se pudo obtener respuesta. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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

          {/* Response Area */}
          <div 
            className="mb-12"
            role="main"
            aria-live="polite"
            aria-label="AI Assistant Response"
          >
            {isLoading ? (
              <ResponseSkeleton />
            ) : answerData ? (
              <div className="max-w-[900px]">
                <div className="prose prose-lg max-w-none">
                  <p className="text-[18px] leading-[1.6] text-foreground m-0">
                    {answerData.text}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Product Grid */}
          {answerData?.products && answerData.products.length > 0 && (
            <ProductGrid 
              products={answerData.products} 
              isLoading={isLoading}
            />
          )}
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