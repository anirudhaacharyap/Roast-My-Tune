import { cn } from "@/lib/utils";

interface FloatingEmojiProps {
  emoji: string;
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

export const FloatingEmoji = ({
  emoji,
  className,
  delay = 0,
  size = "md",
}: FloatingEmojiProps) => {
  return (
    <span
      className={cn(
        "absolute animate-float select-none pointer-events-none",
        sizeClasses[size],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {emoji}
    </span>
  );
};
