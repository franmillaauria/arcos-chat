import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChipRow } from "./ChipRow";
import { useToast } from "@/hooks/use-toast";
import { asset } from "@/lib/asset";

// Helpers: sessionId + currentUrl (solo navegador)
const getSessionId = (): string => {
  if (typeof window === "undefined") return "sess_server";
  let id = sessionStorage.getItem("sessionId");
  if (!id) {
    const rand =
      (globalThis.crypto?.randomUUID?.().replace(/-/g, "").slice(0, 12)) ||
      Math.random().toString(36).slice(2, 10);
    id = "sess_" + rand;
    sessionStorage.setItem("sessionId", id);
  }
  return id;
};

const getCurrentUrl = (): string | null =>
  typeof window === "undefined" ? null : window.location.href;

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
  // (… deja tu chipData tal cual …)
  [
    { text: "¿Dónde fabricamos nuestros productos?", variant: "light" as const, avatarSrc: asset("lovable-uploads/59fc1896-4cf4-4794-8db3-c3f33cc9d40c.png") },
    { text: "¿Cómo empezamos?", variant: "dark" as const, avatarSrc: asset("lovable-uploads/fed6f395-12cd-45b5-8b61-b048abc7fca4.png") },
    { text: "Nuestros últimos productos…", variant: "light" as const, avatarSrc: asset("lovable-uploads/0b98bdbd-6f9b-4110-87d0-63635492e64a.png") },
    { text: "Nuestras tiendas…", variant: "dark" as const, avatarSrc: asset("lovable-uploads/54841983-2b4e-43d0-b761-bf2e607a0f15.png") },
    { text: "¿Cómo se fabrican nuestros productos?", variant: "light" as const, avatarSrc: asset("lovable-uploads/c5dc4a52-ece1-4b37-8247-54818ec4948f.png") },
    { text: "Lo más premium…", variant: "dark" as const, avatarSrc: asset("lovable-uploads/d304a647-7a86-4f0c-9674-bb4ab4e9be51.png") },
    { text: "¿Dónde encontrarnos?", variant: "light" as const, avatarSrc: asset("lovable-uploads/be99c701-7ad3-47cc-86ab-8b00aa7af2da.png") },
    { text: "Nuestra historia…", variant: "dark" as const, avatarSrc: asset("lovable-uploads/9c0dfb20-3fcc-48ad-af29-b32af7cd9161.png") },
  ],
  // … (resto igual)
];

const AIHeroWebchat = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.asistentesinnova.com/webhook/21fefe19-021f-42fe-b6f6-a5a04043fd69";

  const askAssistant = async (question: string) => {
    if (!question.trim()) return;

    const sessionId = getSessionId();
    const currentUrl = getCurrentUrl();

    setIsLoading(true);
    try {
      // Enviar al webhook con sessionId y currentUrl
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          sessionId,
          currentUrl,
          source: "web_chat",      // útil para trazar origen
          ts: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.error("Error calling webhook:", err);
      toast({
        title: "No he podido contactar con el asistente",
        description: "Inténtalo de nuevo en unos segundos.",
        variant: "destructive",
      });
    } finally {
      // Navega pasando también los metadatos por si los necesitas en /answer
      navigate("/answer", {
        state: {
          question,
          isLoading: true,
          sessionId,
          currentUrl,
        },
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askAssistant(inputValue);
  };

  const handleChipClick = (text: string) => {
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
              className="h-[66px] w-full rounded-[88px] border-0 bg-white px-8 text-[14px] md:text-[22px] font-inter font-normal leading-[100%] tracking-[0%] shadow-[0_4px_20px_rgba(0,0,0,0.08)] placeholder:text-[14px] md:placeholder:text-[22px] placeholder:font-inter placeholder:font-normal placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
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
          <h1 className="font-gt-pressura font-normal text-[22px] leading-[24px] md:text-[33px] md:leading-[39px] tracking-[0%] uppercase text-foreground">
            PREGÚNTAME CUALQUIER COSA SOBRE
            <br />
            NUESTROS PRODUCTOS Y SERVICIOS
          </h1>
        </div>

        {/* Mobile Chip Rows */}
        <div className="md:hidden bg-white rounded-2xl overflow-hidden mb-8">
          <div className="space-y-4 py-8">
            <ChipRow chips={chipData[0]} direction="right" speed="60s" onChipClick={handleChipClick} />
            <ChipRow chips={chipData[1]} direction="left"  speed="70s" onChipClick={handleChipClick} />
            <ChipRow chips={chipData[2]} direction="right" speed="80s" onChipClick={handleChipClick} />
            <ChipRow chips={chipData[3]} direction="left"  speed="65s" onChipClick={handleChipClick} />
            <ChipRow chips={chipData[4]} direction="right" speed="75s" onChipClick={handleChipClick} />
            <ChipRow chips={chipData[5]} direction="left"  speed="85s" onChipClick={handleChipClick} />
          </div>
        </div>
      </div>

      {/* Desktop Chip Rows */}
      <div className="hidden md:block bg-white">
        <div className="space-y-6 overflow-hidden py-12">
          <ChipRow chips={chipData[0]} direction="right" speed="60s" onChipClick={handleChipClick} />
          <ChipRow chips={chipData[1]} direction="left"  speed="70s" onChipClick={handleChipClick} />
          <ChipRow chips={chipData[2]} direction="right" speed="80s" onChipClick={handleChipClick} />
        </div>
      </div>
    </section>
  );
};

export default AIHeroWebchat;
