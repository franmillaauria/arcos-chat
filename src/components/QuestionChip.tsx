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
    md: "min-h-[48px] pl-4 pr-12 text-base",
    sm: "min-h-[36px] pl-3 pr-10 text-sm"
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
    <button
      className={`
        relative inline-flex items-center rounded-full font-medium
        transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap
        shadow-[0_4px_14px_rgba(0,0,0,0.06)] font-inter font-medium
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      onClick={onClick}
      type="button"
    >
      <span className="relative z-10">{text}</span>
      
      {/* Avatar positioned to overflow */}
      <div 
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-2
          ${avatarSizes[size]} rounded-full border-2 border-white
          bg-gray-300 flex-shrink-0 z-20 overflow-hidden
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
    </button>
  );
};