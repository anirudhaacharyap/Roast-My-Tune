import { cn } from "@/lib/utils";

interface FloatingBubbleProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: "primary" | "secondary" | "accent" | "dark" | "pink" | "blue";
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  dark: "bg-foreground text-background",
  pink: "bg-neon-pink text-background",
  blue: "bg-neon-blue text-background",
};

export const FloatingBubble = ({
  text,
  className,
  delay = 0,
  variant = "dark",
}: FloatingBubbleProps) => {
  return (
    <span
      className={cn(
        "absolute animate-float select-none pointer-events-none px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide border-2 border-foreground shadow-brutal-sm",
        variantClasses[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </span>
  );
};
