interface Chip {
  text: string;
  variant: "light" | "dark";
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
      ? speed === "38s" 
        ? "animate-slide-right-38" 
        : "animate-slide-right-54"
      : "animate-slide-left-46";

  // Double the chips for seamless loop
  const doubledChips = [...chips, ...chips];

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`flex gap-4 w-[200%] ${animationClass} motion-reduce:animate-none hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {doubledChips.map((chip, index) => (
          <ChipButton
            key={`${chip.text}-${index}`}
            text={chip.text}
            variant={chip.variant}
            onClick={() => onChipClick(chip.text)}
          />
        ))}
      </div>
    </div>
  );
};

interface ChipButtonProps {
  text: string;
  variant: "light" | "dark";
  onClick: () => void;
}

const ChipButton = ({ text, variant, onClick }: ChipButtonProps) => {
  const baseClasses = "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap";
  const variantClasses = variant === "light" 
    ? "bg-hero-chip-light-bg text-hero-chip-light-text" 
    : "bg-hero-chip-dark-bg text-hero-chip-dark-text";

  return (
    <button
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      type="button"
    >
      <span className="text-sm md:text-base">{text}</span>
      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0"></div>
    </button>
  );
};