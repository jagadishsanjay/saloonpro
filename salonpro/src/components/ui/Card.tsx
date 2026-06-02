import { HTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface/60 backdrop-blur-md rounded-2xl border border-accent/10 hover:border-accent/40 transition-all duration-500 overflow-hidden relative group",
          className
        )}
        {...props}
      >
        {/* Subtle glow effect in the corner of the card */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-700" />
        
        {/* The actual content */}
        <div className="relative z-10">{props.children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";
