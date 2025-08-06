import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Scale, TrendingDown, TrendingUp } from "lucide-react";
import WeightChart from "./weight-chart";
import WeightProgress from "./weight-progress";

export default function WeightCard() {
  // Примерные данные веса
  const weightData = {
    current: 78.5,
    target: 75.0,
    startWeight: 82.0,
    // История веса за последние 7 дней
    history: [
      { date: "2025-08-01", weight: 79.2 },
      { date: "2025-08-02", weight: 78.8 },
      { date: "2025-08-03", weight: 79.1 },
      { date: "2025-08-04", weight: 78.6 },
      { date: "2025-08-05", weight: 78.3 },
      { date: "2025-08-06", weight: 78.7 },
      { date: "2025-08-07", weight: 78.5 },
    ],
  };

  const weightChange = weightData.current - weightData.startWeight;
  const isLosingWeight = weightChange < 0;
  const remainingWeight = weightData.current - weightData.target;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scale className="h-5 w-5 text-blue-600" />
          Вага
        </CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-blue-600" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Текущий вес и тренд */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{weightData.current} кг</div>
            <div className="text-sm text-muted-foreground">Поточна вага</div>
          </div>
          <div className="flex items-center gap-2">
            {isLosingWeight ? (
              <TrendingDown className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              isLosingWeight ? 'text-green-600' : 'text-red-600'
            }`}>
              {isLosingWeight ? '' : '+'}{weightChange.toFixed(1)} кг
            </span>
          </div>
        </div>

        {/* График веса */}
        <WeightChart data={weightData.history} />

        {/* Прогресс к цели */}
        <WeightProgress 
          current={weightData.current}
          target={weightData.target}
          start={weightData.startWeight}
        />

        {/* Информация о цели */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">До цілі:</span>
            <span className="font-medium">
              {remainingWeight > 0 ? `${remainingWeight.toFixed(1)} кг` : 'Ціль досягнута! 🎉'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
