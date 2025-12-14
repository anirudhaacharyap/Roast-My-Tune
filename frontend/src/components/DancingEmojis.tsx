import { cn } from "@/lib/utils";

interface DancingEmojisProps {
  className?: string;
}

const emojis = ["🎵", "🎶", "🎤", "🎧", "💿", "🔥", "💀", "😭"];

export const DancingEmojis = ({ className }: DancingEmojisProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-4 text-5xl", className)}>
      {emojis.slice(0, 5).map((emoji, i) => (
        <span
          key={i}
          className="animate-bounce-slow"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};
