import { cn } from "@/lib/utils";

interface EqualizerProps {
  className?: string;
  barCount?: number;
}

export const Equalizer = ({ className, barCount = 5 }: EqualizerProps) => {
  return (
    <div className={cn("flex items-end gap-1.5 h-16", className)}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-3 bg-primary rounded-full"
          style={{
            animation: `equalizer 0.8s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
};
