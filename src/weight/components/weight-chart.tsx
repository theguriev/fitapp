import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeightChartProps {
  period: "D" | "W" | "M" | "Y";
}

export default function WeightChart({ period }: WeightChartProps) {
  const [currentWeight] = useState(75.5);

  // Функция для получения данных в зависимости от периода
  const getDataForPeriod = (period: "D" | "W" | "M" | "Y") => {
    switch (period) {
      case "D":
        // Данные по дням недели (последние 7 дней)
        return {
          data: [76.2, 76.0, 75.8, 75.6, 75.4, 75.3, 75.5],
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
        };
      case "W":
        // Данные по неделям (последние 4 недели)
        return {
          data: [76.8, 76.2, 75.8, 75.5],
          labels: ["1 тиж", "2 тиж", "3 тиж", "4 тиж"]
        };
      case "M":
        // Данные по месяцам (последние 6 месяцев)
        return {
          data: [78.5, 77.8, 77.2, 76.5, 76.0, 75.5],
          labels: ["Лют", "Бер", "Кві", "Тра", "Чер", "Лип"]
        };
      case "Y":
        // Данные по годам (последние 3 года)
        return {
          data: [80.2, 77.8, 75.5],
          labels: ["2023", "2024", "2025"]
        };
      default:
        return {
          data: [],
          labels: []
        };
    }
  };

  const { data, labels } = getDataForPeriod(period);
  const maxWeight = Math.max(...data);
  const minWeight = Math.min(...data);
  const weightRange = maxWeight - minWeight || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          Вага
        </CardTitle>
        <div className="flex items-baseline gap-1">
          <p className="text-4xl font-light text-blue-500 tabular-nums">
            {currentWeight.toFixed(1)}
          </p>
          <span className="text-lg text-muted-foreground">кг</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* График веса */}
        <div className="flex items-end justify-between h-32 gap-1 mb-3">
          {data.map((weight, index) => {
            // Нормализуем высоту относительно диапазона веса
            const normalizedHeight = ((weight - minWeight) / weightRange) * 80 + 20;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-end h-32"
              >
                <div
                  className="w-full bg-blue-500 rounded-sm transition-all duration-300 min-h-[4px]"
                  style={{ height: `${normalizedHeight}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Часові/періодні мітки */}
        <div className="flex justify-between text-xs text-muted-foreground">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        {/* Статистика изменения */}
        {data.length > 1 && (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-muted-foreground">Зміна: </span>
                <span className={`font-medium ${
                  data[data.length - 1] < data[0] 
                    ? 'text-green-600' 
                    : data[data.length - 1] > data[0]
                    ? 'text-red-500'
                    : 'text-muted-foreground'
                }`}>
                  {data[data.length - 1] < data[0] ? '-' : '+'}
                  {Math.abs(data[data.length - 1] - data[0]).toFixed(1)} кг
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Діапазон: </span>
                <span className="font-medium">
                  {minWeight.toFixed(1)} - {maxWeight.toFixed(1)} кг
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
