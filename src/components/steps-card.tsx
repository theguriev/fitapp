import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function StepsCard() {
  const [stepCount] = useState(3672);

  // Данные по часам для графика шагов (24 часа)
  const hourlySteps = [
    0,
    0,
    0,
    0,
    0,
    0, // 00-05
    120,
    180,
    250,
    320,
    180,
    290, // 06-11
    450,
    380,
    520,
    340,
    280,
    190, // 12-17
    420,
    380,
    290,
    180,
    120,
    80, // 18-23
  ];

  const maxSteps = Math.max(...hourlySteps);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Шаги</CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Шаги за сегодня */}
        <div>
          <p className="text-sm text-muted-foreground">Сегодня</p>
          <p className="text-4xl font-light text-purple-400 tabular-nums">
            {stepCount.toLocaleString()}
          </p>
        </div>

        <div>
          {/* Столбцы графика */}
          <div className="flex items-end justify-between h-16 gap-1">
            {hourlySteps.map((steps, index) => {
              const height = maxSteps > 0 ? (steps / maxSteps) * 100 : 0;
              return (
                <div
                  key={index}
                  className="flex-1 bg-muted rounded-sm relative overflow-hidden h-16"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-purple-400 rounded-sm transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Временные метки */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
