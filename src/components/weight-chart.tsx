"use client";

import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeightDataPoint {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightDataPoint[];
  targetWeight: number;
}

interface TooltipPayload {
  payload: {
    weight: number;
    formattedDate: string;
  };
}

export default function WeightChart({ data, targetWeight }: WeightChartProps) {
  // Подготавливаем данные для Recharts
  const chartData = data.map((point, index) => ({
    ...point,
    day: `День ${index + 1}`,
    target: targetWeight,
    formattedDate: new Date(point.date).toLocaleDateString("uk-UA", {
      month: "short",
      day: "numeric",
    }),
  }));

  // Определяем диапазон для Y-оси
  const weights = data.map((d) => d.weight);
  const allWeights = [...weights, targetWeight];
  const minWeight = Math.min(...allWeights) - 1;
  const maxWeight = Math.max(...allWeights) + 1;

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
          <p className="text-sm font-medium">{data.formattedDate}</p>
          <p className="text-sm text-blue-600">
            Вага: <span className="font-semibold">{data.weight} кг</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-3 text-center">
        Динаміка ваги (7 днів)
      </div>
      <div className="relative bg-muted/30 rounded-lg">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart
            data={chartData}
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
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              hide
            />

            <YAxis
              domain={[minWeight, maxWeight]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              hide
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Целевая линия */}
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

        {/* Подписи дат */}
        <div className="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>
            {new Date(data[0].date).toLocaleDateString("uk-UA", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>Сьогодні</span>
        </div>
      </div>
    </div>
  );
}
