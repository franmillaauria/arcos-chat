interface QuestionChipProps {
  text: string;
  variant: "light" | "dark";
  size?: "md" | "sm";
  avatarSrc?: string;
  onClick?: () => void;
}

export const QuestionChip = ({ 
  text, 
  variant, 
  size = "md", 
  avatarSrc,
  onClick 
}: QuestionChipProps) => {
  const sizeClasses = {
    md: "h-[28px] px-6 text-[22px] font-inter font-normal leading-[100%] tracking-[0%]",
    sm: "h-[24px] px-4 text-[22px] font-inter font-normal leading-[100%] tracking-[0%]"
  };

  const avatarSizes = {
    md: "w-12 h-12", // 48px - larger than pill
    sm: "w-10 h-10"  // 40px - larger than pill
  };

  const variantClasses = {
    light: "bg-[#ECEEE8] text-foreground",
    dark: "bg-foreground text-background"
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Main pill button */}
      <button
        className={`
          inline-flex items-center rounded-full font-normal
          transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap
          shadow-[0_4px_14px_rgba(0,0,0,0.06)] font-inter
          ${sizeClasses[size]}
          ${variantClasses[variant]}
        `}
        onClick={onClick}
        type="button"
      >
        <span>{text}</span>
      </button>
      
      {/* Avatar circle positioned next to the pill without overlap */}
      <div 
        className={`
          ${avatarSizes[size]} rounded-full border-2 border-white
          bg-gray-300 flex-shrink-0 overflow-hidden ml-2
        `}
      >
        {avatarSrc ? (
          <img 
            src={avatarSrc} 
            alt="" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500" />
        )}
      </div>
    </div>
  );
};