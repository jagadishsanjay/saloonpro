import { InputHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface/40 backdrop-blur-sm border border-accent/10 rounded-xl px-5 py-3.5 text-foreground placeholder:text-textSecondary/50 focus:outline-none focus:border-accent/60 focus:shadow-gold transition-all duration-300 text-sm",
            className
          )}
          {...props}
        />
        {/* Bottom gold line on focus */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-focus-within:w-1/2 transition-all duration-500 rounded-full opacity-50" />
      </div>
    );
  }
);
Input.displayName = "Input";
