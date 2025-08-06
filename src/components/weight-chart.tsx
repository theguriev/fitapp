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
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

type TimePeriod = "W" | "M" | "Y";

export default function WeightChart({ data, targetWeight }: WeightChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("W");

  // Генеруємо тестові дані для різних періодів
  const getDataForPeriod = (period: TimePeriod) => {
    const baseWeight = 78.5;

    switch (period) {
      case "W": // Тиждень - оригінальні дані
        return data;
      case "M": // Місяць - 30 днів
        return Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          weight:
            baseWeight + (Math.random() - 0.5) * 2 + Math.sin(i / 5) * 0.5,
        }));
      case "Y": // Рік - 12 місяців
        return Array.from({ length: 12 }, (_, i) => ({
          date: new Date(2025, i, 15).toISOString().split("T")[0],
          weight: baseWeight + (Math.random() - 0.5) * 3 + (i - 6) * 0.2,
        }));
      default:
        return data;
    }
  };

  // Кастомний компонент тултипа
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

  const tabs = [
    { id: "W" as TimePeriod, label: "W", name: "Тиждень" },
    { id: "M" as TimePeriod, label: "M", name: "Місяць" },
    { id: "Y" as TimePeriod, label: "Y", name: "Рік" },
  ];

  const renderChart = (period: TimePeriod) => {
    const periodData = getDataForPeriod(period);

    // Підготовлюємо дані для Recharts
    const periodChartData = periodData.map((point, index) => {
      let formattedDate = "";

      switch (period) {
        case "W":
          formattedDate = new Date(point.date).toLocaleDateString("uk-UA", {
            month: "short",
            day: "numeric",
          });
          break;
        case "M":
          formattedDate = new Date(point.date).toLocaleDateString("uk-UA", {
            month: "short",
            day: "numeric",
          });
          break;
        case "Y":
          formattedDate = new Date(point.date).toLocaleDateString("uk-UA", {
            month: "short",
          });
          break;
      }

      return {
        ...point,
        day: `День ${index + 1}`,
        target: targetWeight,
        formattedDate,
        weight: Number(point.weight.toFixed(1)),
      };
    });

    // Визначаємо діапазон для Y-осі
    const periodWeights = periodData.map((d) => d.weight);
    const periodAllWeights = [...periodWeights, targetWeight];
    const periodMinWeight = Math.min(...periodAllWeights) - 1;
    const periodMaxWeight = Math.max(...periodAllWeights) + 1;

    return (
      <div className="relative bg-muted/30 rounded-lg">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart
            data={periodChartData}
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
              domain={[periodMinWeight, periodMaxWeight]}
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
                r: period === "Y" ? 3 : 4,
                fill: "hsl(217, 91%, 60%)",
                stroke: "white",
                strokeWidth: 2,
              }}
              activeDot={{
                r: period === "Y" ? 5 : 6,
                fill: "hsl(217, 91%, 60%)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Підписи дат */}
        <div className="flex justify-between mt-3 px-4 pb-4 text-xs text-muted-foreground">
          <span>{periodChartData[0]?.formattedDate}</span>
          <span>
            {period === "W"
              ? "Сьогодні"
              : periodChartData[periodChartData.length - 1]?.formattedDate}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs
        defaultValue="W"
        value={selectedPeriod}
        onValueChange={(value: string) =>
          setSelectedPeriod(value as TimePeriod)
        }
      >
        <div className="flex items-center justify-center mb-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {renderChart(tab.id)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
