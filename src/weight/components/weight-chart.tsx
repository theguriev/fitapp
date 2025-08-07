import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

interface WeightChartProps {
  period: "W" | "M" | "Y" | "5Y";
}

interface TooltipPayload {
  payload: {
    weight: number;
    label: string;
  };
}

export default function WeightChart({ period }: WeightChartProps) {
  const [currentWeight] = useState(75.5);
  const [targetWeight] = useState(73.0); // Целевой вес

  // Функция для получения данных в зависимости от периода
  const getDataForPeriod = (period: "W" | "M" | "Y" | "5Y") => {
    switch (period) {
      case "W":
        // Данные по дням недели (последние 7 дней)
        return [
          { label: "Пн", weight: 76.2 },
          { label: "Вт", weight: 76.0 },
          { label: "Ср", weight: 75.8 },
          { label: "Чт", weight: 75.6 },
          { label: "Пт", weight: 75.4 },
          { label: "Сб", weight: 75.3 },
          { label: "Нд", weight: 75.5 },
        ];
      case "M":
        // Данные по месяцам (последние 6 месяцев)
        return [
          { label: "Лют", weight: 78.5 },
          { label: "Бер", weight: 77.8 },
          { label: "Кві", weight: 77.2 },
          { label: "Тра", weight: 76.5 },
          { label: "Чер", weight: 76.0 },
          { label: "Лип", weight: 75.5 },
        ];
      case "Y":
        // Данные по годам (последние 3 года)
        return [
          { label: "2023", weight: 80.2 },
          { label: "2024", weight: 77.8 },
          { label: "2025", weight: 75.5 },
        ];
      case "5Y":
        // Данные за 5 лет
        return [
          { label: "2021", weight: 85.0 },
          { label: "2022", weight: 82.5 },
          { label: "2023", weight: 80.2 },
          { label: "2024", weight: 77.8 },
          { label: "2025", weight: 75.5 },
        ];
      default:
        return [];
    }
  };

  const data = getDataForPeriod(period);
  const weights = data.map((d) => d.weight);
  const maxWeight = Math.max(...weights, targetWeight);
  const minWeight = Math.min(...weights, targetWeight);

  // Кастомный компонент тултипа
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayload[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{data.label}</p>
          <p className="text-sm text-blue-500">
            Вага:{" "}
            <span className="font-semibold">{data.weight.toFixed(1)} кг</span>
          </p>
        </div>
      );
    }
    return null;
  };

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
        {/* График веса с Recharts */}
        <div className="h-40 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(217, 91%, 60%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(217, 91%, 60%)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                hide
              />

              <YAxis
                domain={[minWeight - 1, maxWeight + 1]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                hide
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Цільова лінія */}
              <ReferenceLine
                y={targetWeight}
                stroke="hsl(142, 71%, 45%)"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: `Ціль ${targetWeight}кг`,
                  position: "top",
                  style: {
                    fontSize: "12px",
                    fill: "hsl(142, 71%, 45%)",
                    fontWeight: "500",
                  },
                }}
              />

              <Area
                type="monotone"
                dataKey="weight"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={3}
                fill="url(#weightGradient)"
                dot={{
                  r: 4,
                  fill: "hsl(217, 91%, 60%)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(217, 91%, 60%)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Подписи периодов */}
        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          <span>{data[0]?.label}</span>
          <span>{data[data.length - 1]?.label}</span>
        </div>

        {/* Статистика изменения */}
        {data.length > 1 && (
          <div className="pt-3 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-muted-foreground">Зміна: </span>
                <span
                  className={`font-medium ${
                    data[data.length - 1].weight < data[0].weight
                      ? "text-green-600"
                      : data[data.length - 1].weight > data[0].weight
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {data[data.length - 1].weight < data[0].weight ? "-" : "+"}
                  {Math.abs(
                    data[data.length - 1].weight - data[0].weight
                  ).toFixed(1)}{" "}
                  кг
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Діапазон: </span>
                <span className="font-medium">
                  {minWeight.toFixed(1)} - {maxWeight.toFixed(1)} кг
                </span>
              </div>
            </div>

            {/* Информация о цели */}
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-muted-foreground">До цілі: </span>
                <span
                  className={`font-medium ${
                    currentWeight <= targetWeight
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {currentWeight <= targetWeight
                    ? "Ціль досягнута! 🎉"
                    : `${(currentWeight - targetWeight).toFixed(1)} кг`}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Ціль: </span>
                <span className="font-medium text-green-600">
                  {targetWeight.toFixed(1)} кг
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
