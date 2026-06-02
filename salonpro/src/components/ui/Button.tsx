import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-primary hover:bg-accent-light shadow-gold hover:shadow-gold-lg font-bold uppercase tracking-widest text-[11px]",
      gold: "gold-text border border-accent/30 hover:border-accent shadow-gold hover:shadow-gold-lg font-bold uppercase tracking-widest text-[11px] bg-accent/5",
      outline: "border-2 border-accent/60 text-accent hover:bg-accent hover:text-primary font-bold uppercase tracking-widest text-[11px]",
      ghost: "text-accent hover:bg-accent/10 font-bold uppercase tracking-widest text-[11px]",
    };

    const sizes = {
      sm: "px-4 py-2",
      md: "px-7 py-3.5",
      lg: "px-10 py-5 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 justify-center rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95 overflow-hidden relative group",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Subtle shimmer effect on all buttons */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
        <span className="relative z-10">{props.children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
