import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChipRow } from "./ChipRow";
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

  const askAssistant = (chipText: string) => {
    setInputValue(chipText);
    // Here you would implement the actual AI assistant functionality
    console.log("Asking assistant:", chipText);
  };

  const handleChipClick = (text: string) => {
    askAssistant(text);
  };

  return (
    <section className="min-h-screen bg-hero-bg">
      <div className="mx-auto max-w-[1200px] px-4 py-28">
        {/* Input - Left Aligned */}
        <div className="mb-12">
          <div className="relative w-full max-w-2xl">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="How can I help?"
              aria-label="Ask our AI assistant a question"
              className="h-[68px] w-full rounded-full border-0 bg-white px-8 text-lg font-medium shadow-[0_4px_20px_rgba(0,0,0,0.08)] placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Title - Left Aligned */}
        <div className="mb-16">
          <h1 className="font-bold text-3xl tracking-[0.04em] uppercase text-foreground md:text-4xl">
            ASK ME ANYTHING ABOUT OUR
            <br />
            PRODUCTS, AND SERVICES
          </h1>
        </div>

        {/* Chip Rows */}
        <div className="space-y-6 overflow-hidden">
          <ChipRow
            chips={chipData[0]}
            direction="right"
            speed="38s"
            onChipClick={handleChipClick}
          />
          <ChipRow
            chips={chipData[1]}
            direction="left"
            speed="46s"
            onChipClick={handleChipClick}
          />
          <ChipRow
            chips={chipData[2]}
            direction="right"
            speed="54s"
            onChipClick={handleChipClick}
          />
        </div>
      </div>
    </section>
  );
};

export default AIHeroWebchat;