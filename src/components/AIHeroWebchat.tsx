import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChipRow } from "./ChipRow";
import { useToast } from "@/hooks/use-toast";
import avatarBusinessman from "@/assets/avatar-businessman.jpg";
import avatarCraftsman from "@/assets/avatar-craftsman.jpg";
import avatarFactory from "@/assets/avatar-factory.jpg";
import avatarShop from "@/assets/avatar-shop.jpg";
import knifeChef from "@/assets/knife-chef.jpg";
import knifeSet from "@/assets/knife-set.jpg";
import knifeSantoku from "@/assets/knife-santoku.jpg";
import knifeBoning from "@/assets/knife-boning.jpg";

// Mapping between chip display text and actual query
const chipTextMapping: Record<string, string> = {
  "Nuestras tiendas…": "Cuéntame la historia de vuestras tiendas",
  "¿Dónde encontrarnos?": "¿Dónde puedo encontraros?",
  "¿Cómo se fabrican nuestros productos?": "¿Cómo se fabrican vuestros productos?",
  "Nuestra historia…": "Háblame de la historia de Arcos",
  "¿Cómo empezamos?": "¿Cuáles fueron los comienzos de la marca Arcos?",
  "¿Dónde fabricamos nuestros productos?": "¿Dónde se fabrican los productos Arcos?",
  "Lo más premium…": "Dime los productos Arcos más premium",
  "Nuestros últimos productos…": "Nuestros últimos productos…" // Keep as is
};

const chipData = [
  // Row 1 (slides right)
  [
    { text: "¿Dónde fabricamos nuestros productos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestros últimos productos…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Nuestras tiendas…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Lo más premium…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "¿Dónde encontrarnos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "Nuestra historia…", variant: "dark" as const, avatarSrc: avatarBusinessman },
  ],
  // Row 2 (slides left)
  [
    { text: "Lo más premium…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "¿Dónde encontrarnos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "Nuestra historia…", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "¿Dónde fabricamos nuestros productos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestros últimos productos…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "Nuestras tiendas…", variant: "dark" as const, avatarSrc: avatarShop },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "light" as const, avatarSrc: avatarCraftsman },
  ],
  // Row 3 (slides right)
  [
    { text: "Nuestras tiendas…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "dark" as const, avatarSrc: avatarCraftsman },
    { text: "Lo más premium…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "¿Dónde encontrarnos?", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "Nuestra historia…", variant: "light" as const, avatarSrc: avatarBusinessman },
    { text: "¿Dónde fabricamos nuestros productos?", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "¿Cómo empezamos?", variant: "light" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestros últimos productos…", variant: "dark" as const, avatarSrc: avatarCraftsman },
  ],
  // Row 4 (slides left)
  [
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestras tiendas…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "¿Dónde fabricamos nuestros productos?", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "Lo más premium…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "Nuestra historia…", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "¿Dónde encontrarnos?", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "Nuestros últimos productos…", variant: "light" as const, avatarSrc: avatarCraftsman },
  ],
  // Row 5 (slides right)
  [
    { text: "¿Dónde encontrarnos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "Nuestra historia…", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestros últimos productos…", variant: "light" as const, avatarSrc: avatarCraftsman },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "dark" as const, avatarSrc: avatarCraftsman },
    { text: "¿Dónde fabricamos nuestros productos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Lo más premium…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "Nuestras tiendas…", variant: "dark" as const, avatarSrc: avatarShop },
  ],
  // Row 6 (slides left)
  [
    { text: "Nuestros últimos productos…", variant: "dark" as const, avatarSrc: avatarCraftsman },
    { text: "¿Dónde fabricamos nuestros productos?", variant: "light" as const, avatarSrc: avatarFactory },
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: avatarBusinessman },
    { text: "Nuestras tiendas…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "dark" as const, avatarSrc: avatarCraftsman },
    { text: "Lo más premium…", variant: "light" as const, avatarSrc: avatarShop },
    { text: "¿Dónde encontrarnos?", variant: "dark" as const, avatarSrc: avatarFactory },
    { text: "Nuestra historia…", variant: "light" as const, avatarSrc: avatarBusinessman },
  ],
];

const AIHeroWebchat = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.helloauria.com/webhook/21fefe19-021f-42fe-b6f6-a5a04043fd69";

  const askAssistant = async (question: string) => {
    if (!question.trim()) return;
    
    // Navigate immediately to answer page with the question
    navigate("/answer", { 
      state: { 
        question: question,
        isLoading: true
      } 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askAssistant(inputValue);
  };

  const handleChipClick = (text: string) => {
    // Use the mapped query text if available, otherwise use the original text
    const queryText = chipTextMapping[text] || text;
    setInputValue(queryText);
    askAssistant(queryText);
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
          <form onSubmit={handleSubmit} className="relative w-full max-w-[751px]">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="¿En qué puedo ayudarte?"
              aria-label="Pregunta a nuestro asistente de IA"
              disabled={isLoading}
              className="h-[66px] w-full rounded-[88px] border-0 bg-white px-8 text-[22px] font-inter font-normal leading-[100%] tracking-[0%] shadow-[0_4px_20px_rgba(0,0,0,0.08)] placeholder:text-[22px] placeholder:font-inter placeholder:font-normal placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            )}
          </form>
        </div>

        {/* Title - Left Aligned */}
        <div className="mb-8 md:mb-16 max-w-[700px]">
          <h1 className="font-gt-pressura font-normal text-[33px] leading-[39px] tracking-[0%] uppercase text-foreground">
            PREGÚNTAME CUALQUIER COSA SOBRE
            <br />
            NUESTROS PRODUCTOS Y SERVICIOS
          </h1>
        </div>

        {/* Mobile Chip Rows - Positioned right below title on mobile */}
        <div className="md:hidden bg-white rounded-2xl overflow-hidden mb-8">
          <div className="space-y-4 py-8">
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
            <ChipRow
              chips={chipData[3]}
              direction="left"
              speed="65s"
              onChipClick={handleChipClick}
            />
            <ChipRow
              chips={chipData[4]}
              direction="right"
              speed="75s"
              onChipClick={handleChipClick}
            />
            <ChipRow
              chips={chipData[5]}
              direction="left"
              speed="85s"
              onChipClick={handleChipClick}
            />
          </div>
        </div>
      </div>

      {/* Desktop Chip Rows - Full width, hidden on mobile */}
      <div className="hidden md:block bg-white">
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
    </section>
  );
};

export default AIHeroWebchat;