"use client";

import React from "react";

interface MagicButtonProps {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
}

const MagicButton = ({
  title,
  icon,
  position = "right",
  handleClick,
  otherClasses = "",
}: MagicButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={title}
      className="group relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Animated Border */}
      <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CBACF9_0%,#6366F1_50%,#CBACF9_100%)]" />

      {/* Inner Button */}
      <span
        className={`relative z-10 inline-flex h-full w-full items-center justify-center gap-2 rounded-lg bg-background px-7 text-sm font-medium text-foreground backdrop-blur-xl transition-all duration-300 group-hover:bg-background/90 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
