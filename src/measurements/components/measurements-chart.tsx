"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  {
    label: "18.10",
    "Обхват грудей": 97.0,
    "Обхват талії": 85.1,
    "Обхват плеча": 32.2,
    "Обхват стегна": 57.8,
    "Обхват стегон": 91.9,
  },
  {
    label: "01.11",
    "Обхват грудей": 97.3,
    "Обхват талії": 84.8,
    "Обхват плеча": 32.4,
    "Обхват стегна": 57.9,
    "Обхват стегон": 92.1,
  },
  {
    label: "15.11",
    "Обхват грудей": 97.6,
    "Обхват талії": 84.6,
    "Обхват плеча": 32.6,
    "Обхват стегна": 58.0,
    "Обхват стегон": 92.2,
  },
  {
    label: "01.12",
    "Обхват грудей": 97.8,
    "Обхват талії": 84.3,
    "Обхват плеча": 32.7,
    "Обхват стегна": 58.1,
    "Обхват стегон": 92.3,
  },
  {
    label: "15.12",
    "Обхват грудей": 98.2,
    "Обхват талії": 84.5,
    "Обхват плеча": 32.8,
    "Обхват стегна": 58.1,
    "Обхват стегон": 92.3,
  },
];

// Целевые значения для замеров
const targetValues = {
  "Обхват грудей": 102.0,
  "Обхват талії": 80.0,
  "Обхват плеча": 35.0,
  "Обхват стегна": 60.0,
  "Обхват стегон": 95.0,
};

const measurementColors = {
  "Обхват грудей": { color: "#8b5cf6", gradient: "chestGradient" }, // purple
  "Обхват талії": { color: "#f97316", gradient: "waistGradient" }, // orange
  "Обхват плеча": { color: "#3b82f6", gradient: "armGradient" }, // blue
  "Обхват стегна": { color: "#10b981", gradient: "thighGradient" }, // green
  "Обхват стегон": { color: "#ec4899", gradient: "hipsGradient" }, // pink
};

interface TooltipPayload {
  color: string;
  dataKey: string;
  value: number;
  payload: Record<string, number>;
}

export default function MeasurementsChart() {
  // Кастомный компонент тултипа
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}:{" "}
              <span className="font-semibold">{entry.value} см</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mx-4 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-muted-foreground font-normal">
          Динаміка замірів
        </CardTitle>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-light text-purple-600 tabular-nums">5</p>
          <span className="text-sm text-muted-foreground">замірів</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full mb-3">
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
                <linearGradient id="chestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="waistGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="armGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="thighGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="hipsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
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
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                hide
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Обхват грудей */}
              <Area
                type="monotone"
                dataKey="Обхват грудей"
                stroke={measurementColors["Обхват грудей"].color}
                strokeWidth={3}
                fill={`url(#${measurementColors["Обхват грудей"].gradient})`}
                dot={{
                  r: 4,
                  fill: measurementColors["Обхват грудей"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: measurementColors["Обхват грудей"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />

              {/* Обхват талії */}
              <Area
                type="monotone"
                dataKey="Обхват талії"
                stroke={measurementColors["Обхват талії"].color}
                strokeWidth={3}
                fill={`url(#${measurementColors["Обхват талії"].gradient})`}
                dot={{
                  r: 4,
                  fill: measurementColors["Обхват талії"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: measurementColors["Обхват талії"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />

              {/* Обхват плеча */}
              <Area
                type="monotone"
                dataKey="Обхват плеча"
                stroke={measurementColors["Обхват плеча"].color}
                strokeWidth={3}
                fill={`url(#${measurementColors["Обхват плеча"].gradient})`}
                dot={{
                  r: 4,
                  fill: measurementColors["Обхват плеча"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: measurementColors["Обхват плеча"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />

              {/* Обхват стегна */}
              <Area
                type="monotone"
                dataKey="Обхват стегна"
                stroke={measurementColors["Обхват стегна"].color}
                strokeWidth={3}
                fill={`url(#${measurementColors["Обхват стегна"].gradient})`}
                dot={{
                  r: 4,
                  fill: measurementColors["Обхват стегна"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: measurementColors["Обхват стегна"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />

              {/* Обхват стегон */}
              <Area
                type="monotone"
                dataKey="Обхват стегон"
                stroke={measurementColors["Обхват стегон"].color}
                strokeWidth={3}
                fill={`url(#${measurementColors["Обхват стегон"].gradient})`}
                dot={{
                  r: 4,
                  fill: measurementColors["Обхват стегон"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: measurementColors["Обхват стегон"].color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />

              {/* Цільові лінії для всіх замірів */}
              <ReferenceLine
                y={targetValues["Обхват грудей"]}
                stroke={measurementColors["Обхват грудей"].color}
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <ReferenceLine
                y={targetValues["Обхват талії"]}
                stroke={measurementColors["Обхват талії"].color}
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <ReferenceLine
                y={targetValues["Обхват плеча"]}
                stroke={measurementColors["Обхват плеча"].color}
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <ReferenceLine
                y={targetValues["Обхват стегна"]}
                stroke={measurementColors["Обхват стегна"].color}
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <ReferenceLine
                y={targetValues["Обхват стегон"]}
                stroke={measurementColors["Обхват стегон"].color}
                strokeDasharray="5 5"
                strokeWidth={1}
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
          <div className="pt-3 border-t border-border space-y-3">
            {/* Основные показатели */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Груди: </span>
                <span className="font-medium text-purple-600">
                  {data[data.length - 1]["Обхват грудей"]} см
                </span>
                <span className="text-xs text-green-600 ml-1">
                  (+
                  {(
                    data[data.length - 1]["Обхват грудей"] -
                    data[0]["Обхват грудей"]
                  ).toFixed(1)}
                  )
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Талія: </span>
                <span className="font-medium text-orange-600">
                  {data[data.length - 1]["Обхват талії"]} см
                </span>
                <span className="text-xs text-green-600 ml-1">
                  (
                  {(
                    data[data.length - 1]["Обхват талії"] -
                    data[0]["Обхват талії"]
                  ).toFixed(1)}
                  )
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Плече: </span>
                <span className="font-medium text-blue-600">
                  {data[data.length - 1]["Обхват плеча"]} см
                </span>
                <span className="text-xs text-green-600 ml-1">
                  (+
                  {(
                    data[data.length - 1]["Обхват плеча"] -
                    data[0]["Обхват плеча"]
                  ).toFixed(1)}
                  )
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Стегно: </span>
                <span className="font-medium text-green-600">
                  {data[data.length - 1]["Обхват стегна"]} см
                </span>
                <span className="text-xs text-green-600 ml-1">
                  (+
                  {(
                    data[data.length - 1]["Обхват стегна"] -
                    data[0]["Обхват стегна"]
                  ).toFixed(1)}
                  )
                </span>
              </div>
            </div>

            {/* Информация о целях */}
            <div className="text-xs text-muted-foreground">
              <span>Цілі: </span>
              <span className="text-purple-600">
                Груди {targetValues["Обхват грудей"]}см
              </span>
              <span className="mx-1">•</span>
              <span className="text-orange-600">
                Талія {targetValues["Обхват талії"]}см
              </span>
              <span className="mx-1">•</span>
              <span className="text-blue-600">
                Плече {targetValues["Обхват плеча"]}см
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
