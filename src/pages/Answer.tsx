import { useState } from "react";
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
  const [answerData, setAnswerData] = useState<AnswerData | null>({
    text: "Based on our premium craftsmanship and decades of experience, our products are manufactured in our state-of-the-art facilities located in Switzerland and Germany. We maintain strict quality control standards throughout the entire production process, ensuring each piece meets our exceptional standards.",
    products: [
      {
        id: "1",
        title: "Premium Leather Wallet",
        price: "$129.99",
        image: productWallet,
        link: "/products/wallet"
      },
      {
        id: "2", 
        title: "Artisan Watch Collection",
        price: "$899.99",
        image: productWatch,
        link: "/products/watch"
      },
      {
        id: "3",
        title: "Handcrafted Belt",
        price: "$79.99", 
        image: productBelt,
        link: "/products/belt"
      },
      {
        id: "4",
        title: "Luxury Travel Bag",
        price: "$459.99",
        image: productBag, 
        link: "/products/bag"
      }
    ]
  });
  const { toast } = useToast();

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      setAnswerData({
        text: `Thank you for your question: "${inputValue}". Here's what I found based on our extensive product knowledge and customer feedback...`,
        products: answerData?.products || []
      });
      
      setInputValue("");
    } catch (err) {
      setError("Sorry, I couldn't process your request. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
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

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-4 pb-safe">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about our products..."
                className="min-h-[60px] max-h-[120px] rounded-full resize-none px-6 py-4 pr-14 text-base border-2 focus:border-primary"
                aria-label="Ask a question about our products"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              size="lg"
              className="h-[60px] w-[60px] rounded-full p-0 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;