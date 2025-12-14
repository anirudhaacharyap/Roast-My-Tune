import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface ShareCardProps {
  roastText: string;
  username?: string;
  className?: string;
}

export const ShareCard = ({ roastText, username = "music lover", className }: ShareCardProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Gradient border effect */}
      <div className="absolute -inset-1 bg-gradient-neon rounded-4xl opacity-75 blur-sm" />
      
      <Card
        variant="default"
        className="relative bg-dark text-cream p-8 rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-primary">RoastMyTune</h3>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>

        {/* Roast text */}
        <p className="text-lg font-medium leading-relaxed mb-6">
          "{roastText}"
        </p>

        {/* Footer decorations */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-2xl">💀</span>
            <span className="text-2xl">🎵</span>
            <span className="text-2xl">😭</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            roastmytune.app
          </span>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
      </Card>
    </div>
  );
};
