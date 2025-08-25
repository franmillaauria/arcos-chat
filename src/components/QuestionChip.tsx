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
    md: "min-h-[48px] px-6 text-base",
    sm: "min-h-[36px] px-4 text-sm"
  };

  const avatarSizes = {
    md: "w-10 h-10",
    sm: "w-8 h-8"
  };

  const variantClasses = {
    light: "bg-[#ECEEE8] text-[#111111]",
    dark: "bg-[#0B0B0B] text-[#FFFFFF]"
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Main pill button */}
      <button
        className={`
          inline-flex items-center rounded-full font-medium
          transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap
          shadow-[0_4px_14px_rgba(0,0,0,0.06)] font-inter font-medium
          ${sizeClasses[size]}
          ${variantClasses[variant]}
        `}
        onClick={onClick}
        type="button"
      >
        <span>{text}</span>
      </button>
      
      {/* Avatar circle positioned outside the pill */}
      <div 
        className={`
          ${avatarSizes[size]} rounded-full border-2 border-white
          bg-gray-300 flex-shrink-0 overflow-hidden -ml-2
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