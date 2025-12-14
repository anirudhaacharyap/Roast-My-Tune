import { cn } from "@/lib/utils";

interface MoodItem {
  emoji: string;
  label: string;
  percentage: number;
  color: string;
}

interface MoodChartProps {
  moods: MoodItem[];
  className?: string;
}

export const MoodChart = ({ moods, className }: MoodChartProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {moods.map((mood, index) => (
        <div
          key={mood.label}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mood.emoji}</span>
              <span className="font-bold text-sm uppercase tracking-wide">
                {mood.label}
              </span>
            </div>
            <span className="font-extrabold text-lg">{mood.percentage}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden border-2 border-dark">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                mood.color
              )}
              style={{ width: `${mood.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
