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
    sm: "min-h-[40px] pl-3 pr-10 text-sm md:text-[15px]"
  };

  const avatarSizes = {
    md: "w-10 h-10",
    sm: "w-8 h-8"
  };

  const variantClasses = {
    light: "bg-hero-chip-light-bg text-hero-chip-light-text",
    dark: "bg-hero-chip-dark-bg text-hero-chip-dark-text"
  };

  return (
    <button
      className={`
        relative inline-flex items-center rounded-full font-medium
        transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap
        shadow-[0_4px_14px_rgba(0,0,0,0.06)]
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      onClick={onClick}
      type="button"
    >
      <span className="font-inter font-medium">{text}</span>
      
      {/* Avatar positioned to overflow */}
      <div 
        className={`
          absolute right-2 top-1/2 -translate-y-1/2 transform translate-x-2
          ${avatarSizes[size]} rounded-full border-2 border-white
          bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0 z-10
        `}
        style={{
          backgroundImage: avatarSrc ? `url(${avatarSrc})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </button>
  );
};