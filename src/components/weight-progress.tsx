import { Target } from "lucide-react";

interface WeightProgressProps {
  current: number;
  target: number;
  start: number;
}

export default function WeightProgress({ current, target, start }: WeightProgressProps) {
  const totalGoal = Math.abs(target - start);
  const achieved = Math.abs(start - current);
  const progress = Math.min((achieved / totalGoal) * 100, 100);
  
  const isLosingWeight = target < start;
  const goalReached = isLosingWeight ? current <= target : current >= target;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Прогрес до цілі</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {achieved.toFixed(1)} / {totalGoal.toFixed(1)} кг
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            goalReached 
              ? 'bg-gradient-to-r from-green-400 to-green-600' 
              : 'bg-gradient-to-r from-blue-400 to-blue-600'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Початок: {start} кг</span>
        <span className="font-medium text-blue-600">Ціль: {target} кг</span>
      </div>
      
      {goalReached && (
        <div className="text-center py-2">
          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
            🎉 Ціль досягнута!
          </span>
        </div>
      )}
    </div>
  );
}
