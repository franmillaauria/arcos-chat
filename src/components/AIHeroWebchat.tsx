import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChipRow } from "./ChipRow";
import { useToast } from "@/hooks/use-toast";
import avatarBusinessman from "@/assets/avatar-businessman.jpg";
import avatarCraftsman from "@/assets/avatar-craftsman.jpg";
import avatarFactory from "@/assets/avatar-factory.jpg";
import avatarShop from "@/assets/avatar-shop.jpg";

const chipData = [
  // Row 1 (slides right)
  [
    { text: "Where do we make our products", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "How did we start?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Our latest products…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Our shops..", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "How are our products made…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Most premium…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "Where to find us", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "Our history…", variant: "dark" as const, avatarSrc: avatarBusinessman },
  ],
  // Row 2 (slides left)
  [
    { text: "Most premium…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "Where to find us", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "Our history…", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Where do we make our products", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "How did we start?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Our latest products…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Our shops..", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "How are our products made…", variant: "light" as const, avatarSrc: avatarCraftsman },
  ],
  // Row 3 (slides right)
  [
    { text: "Our shops..", variant: "light" as const, avatarSrc: avatarShop },
    { text: "How are our products made…", variant: "dark" as const, avatarSrc: avatarCraftsman },
    { text: "Most premium…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "Where to find us", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "Our history…", variant: "light" as const, avatarSrc: avatarBusinessman },
    { text: "Where do we make our products", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "How did we start?", variant: "light" as const, avatarSrc: avatarBusinessman },
    { text: "Our latest products…", variant: "dark" as const, avatarSrc: avatarCraftsman },
  ],
];

const AIHeroWebchat = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.asistentesinnova.com/webhook/ecd5f122-250e-4db6-ab5a-98060c92d986";

  const askAssistant = async (question: string) => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    console.log("Sending question to n8n:", question);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          timestamp: new Date().toISOString(),
          source: "hero_webchat"
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("n8n response:", result);
        
        // Navigate to answer page with the response data
        navigate("/answer", { 
          state: { 
            question: question,
            response: result 
          } 
        });
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error calling n8n webhook:", error);
      toast({
        title: "Error",
        description: "No se pudo conectar con el asistente. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askAssistant(inputValue);
  };

  const handleChipClick = (text: string) => {
    setInputValue(text);
    askAssistant(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAssistant(inputValue);
    }
  };

  return (
    <section className="min-h-screen bg-hero-bg">
      <div className="mx-auto max-w-[1200px] px-4 py-28">
        {/* Input - Left Aligned */}
        <div className="mb-12">
          <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="How can I help?"
              aria-label="Ask our AI assistant a question"
              disabled={isLoading}
              className="h-[68px] w-full rounded-full border-0 bg-white px-8 text-lg font-medium shadow-[0_4px_20px_rgba(0,0,0,0.08)] placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            )}
          </form>
        </div>

        {/* Title - Left Aligned */}
        <div className="mb-16">
          <h1 className="font-bold text-3xl tracking-[0.04em] uppercase text-foreground md:text-4xl">
            ASK ME ANYTHING ABOUT OUR
            <br />
            PRODUCTS, AND SERVICES
          </h1>
        </div>
      </div>

      {/* White background section for chip rows */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1200px]">
          {/* Chip Rows */}
          <div className="space-y-6 overflow-hidden py-12">
            <ChipRow
              chips={chipData[0]}
              direction="right"
              speed="60s"
              onChipClick={handleChipClick}
            />
            <ChipRow
              chips={chipData[1]}
              direction="left"
              speed="70s"
              onChipClick={handleChipClick}
            />
            <ChipRow
              chips={chipData[2]}
              direction="right"
              speed="80s"
              onChipClick={handleChipClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHeroWebchat;