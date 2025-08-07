import { useState } from "react";

interface StepsChartProps {
  period: "D" | "W" | "M" | "Y";
}

export default function StepsChart({ period }: StepsChartProps) {
  const [stepCount] = useState(8547);

  // Функция для получения данных в зависимости от периода
  const getDataForPeriod = (period: "D" | "W" | "M" | "Y") => {
    switch (period) {
      case "D":
        // Почасовые данные для дня (24 часа)
        return {
          data: [
            0, 0, 0, 0, 0, 0, 120, 180, 250, 320, 180, 290, 450, 380, 520, 340,
            280, 190, 420, 380, 290, 180, 120, 80,
          ],
          labels: ["00", "06", "12", "18", "24"],
        };
      case "W":
        // Данные по дням недели
        return {
          data: [8500, 9200, 7800, 10500, 9800, 6500, 8547],
          labels: ["Пн", "Ср", "Пт", "Нд"],
        };
      case "M":
        // Данные по неделям месяца
        return {
          data: [35000, 42000, 38000, 45000],
          labels: ["1 тиж", "2 тиж", "3 тиж", "4 тиж"],
        };
      case "Y":
        // Данные по месяцам года
        return {
          data: [
            180000, 195000, 210000, 185000, 220000, 205000, 230000, 215000,
            195000, 180000, 160000, 175000,
          ],
          labels: ["Січ", "Кві", "Лип", "Жов"],
        };
      default:
        return {
          data: [],
          labels: [],
        };
    }
  };

  const { data, labels } = getDataForPeriod(period);
  const maxSteps = Math.max(...data);

  return (
    <div className="bg-background rounded-xl p-6 border shadow-sm">
      {/* Кроки за период */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Кількість</p>
        <p className="text-4xl font-light text-purple-400 tabular-nums">
          {stepCount.toLocaleString()}
        </p>
      </div>

      <div>
        {/* Стовпці графіка */}
        <div className="flex items-end justify-between h-32 gap-1">
          {data.map((steps, index) => {
            const height = maxSteps > 0 ? (steps / maxSteps) * 100 : 0;
            return (
              <div
                key={index}
                className="flex-1 bg-muted rounded-sm relative overflow-hidden h-32"
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-purple-400 rounded-sm transition-all duration-300"
                  style={{ height: `${height}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Часові/періодні мітки */}
        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
