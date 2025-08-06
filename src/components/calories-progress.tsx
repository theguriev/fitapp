import { Target } from "lucide-react";

interface CaloriesProgressProps {
  consumed: number;
  target: number;
}

export default function CaloriesProgress({
  consumed,
  target,
}: CaloriesProgressProps) {
  const progress = (consumed / target) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium">Калорії</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {consumed} / {target} ккал
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
