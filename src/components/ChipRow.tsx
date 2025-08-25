import { QuestionChip } from "./QuestionChip";

interface Chip {
  text: string;
  variant: "light" | "dark";
  avatarSrc?: string;
}

interface ChipRowProps {
  chips: Chip[];
  direction: "left" | "right";
  speed: string;
  onChipClick: (text: string) => void;
}

export const ChipRow = ({ chips, direction, speed, onChipClick }: ChipRowProps) => {
  const animationClass = 
    direction === "right" 
      ? speed === "60s" 
        ? "animate-slide-right-60" 
        : "animate-slide-right-80"
      : "animate-slide-left-70";

  // Create enough chips to ensure seamless loop without gaps
  const repeatedChips = [...chips, ...chips, ...chips, ...chips, ...chips];

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`flex gap-4 ${animationClass} motion-reduce:animate-none hover:[animation-play-state:paused]`}
        style={{ 
          animationDuration: speed,
          width: `${repeatedChips.length * 200}px` // Ensure enough width
        }}
      >
        {repeatedChips.map((chip, index) => (
          <QuestionChip
            key={`${chip.text}-${index}`}
            text={chip.text}
            variant={chip.variant}
            size="md"
            avatarSrc={chip.avatarSrc}
            onClick={() => onChipClick(chip.text)}
          />
        ))}
      </div>
    </div>
  );
};