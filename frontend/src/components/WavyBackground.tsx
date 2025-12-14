import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const WavyBackground = ({ className, children }: WavyBackgroundProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />
      
      {/* Geometric patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(var(--dark))"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="hsl(var(--dark))"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="hsl(var(--dark))"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Striped corner decoration */}
      <div className="absolute bottom-0 left-0 w-64 h-64 stripes-pattern opacity-30 -rotate-12 translate-y-20 -translate-x-10" />

      {/* Wavy gradient blobs */}
      <div className="wavy-bg absolute inset-0" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
