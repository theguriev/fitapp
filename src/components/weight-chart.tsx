interface WeightDataPoint {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightDataPoint[];
  targetWeight: number;
}

export default function WeightChart({ data, targetWeight }: WeightChartProps) {
  const chartHeight = 140;
  const padding = 20;

  const weights = data.map((d) => d.weight);
  const allWeights = [...weights, targetWeight];
  const minWeight = Math.min(...allWeights) - 1;
  const maxWeight = Math.max(...allWeights) + 1;
  const weightRange = maxWeight - minWeight;

  // Функция для получения Y координаты по весу
  const getYFromWeight = (weight: number) => {
    return (
      chartHeight -
      padding -
      ((weight - minWeight) / weightRange) * (chartHeight - 2 * padding)
    );
  };

  // Y координата целевой линии
  const targetY = getYFromWeight(targetWeight);

  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-3 text-center">
        Динаміка ваги (7 днів)
      </div>
      <div className="relative bg-muted/30 rounded-lg p-4">
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 300 ${chartHeight}`}
          className="w-full h-auto"
        >
          {/* Градиенты */}
          <defs>
            <linearGradient
              id="weightGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="rgb(59, 130, 246)"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="rgb(59, 130, 246)"
                stopOpacity="0.05"
              />
            </linearGradient>
            <linearGradient
              id="targetGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="rgb(34, 197, 94)"
                stopOpacity="0.8"
              />
              <stop
                offset="100%"
                stopColor="rgb(34, 197, 94)"
                stopOpacity="0.2"
              />
            </linearGradient>
          </defs>

          {/* Горизонтальные линии сетки */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y =
              chartHeight - padding - ratio * (chartHeight - 2 * padding);
            return (
              <line
                key={ratio}
                x1={padding}
                y1={y}
                x2={300 - padding}
                y2={y}
                stroke="rgb(148, 163, 184)"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            );
          })}

          {/* Целевая линия (под основным графиком) */}
          <line
            x1={padding}
            y1={targetY}
            x2={300 - padding}
            y2={targetY}
            stroke="rgb(34, 197, 94)"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeOpacity="0.8"
          />

          {/* Создаем точки для основной линии */}
          {(() => {
            const points = data.map((d, i) => {
              const x = padding + (i / (data.length - 1)) * (300 - 2 * padding);
              const y = getYFromWeight(d.weight);
              return { x, y, weight: d.weight, date: d.date };
            });

            const pathData = points.reduce((path, point, i) => {
              if (i === 0) {
                return `M ${point.x} ${point.y}`;
              }
              return `${path} L ${point.x} ${point.y}`;
            }, "");

            const areaPath = `${pathData} L ${points[points.length - 1].x} ${
              chartHeight - padding
            } L ${points[0].x} ${chartHeight - padding} Z`;

            return (
              <>
                {/* Область под линией */}
                <path d={areaPath} fill="url(#weightGradient)" />

                {/* Основная линия веса */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Точки на графике */}
                {points.map((point, i) => (
                  <g key={i}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="rgb(59, 130, 246)"
                      stroke="white"
                      strokeWidth="2"
                      className="drop-shadow-sm"
                    />
                    {/* Последняя точка выделена */}
                    {i === points.length - 1 && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="7"
                        fill="none"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                ))}
              </>
            );
          })()}

          {/* Подпись целевого веса */}
          <g>
            <rect
              x={300 - padding - 60}
              y={targetY - 10}
              width="55"
              height="20"
              fill="rgba(34, 197, 94, 0.1)"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              rx="10"
            />
            <text
              x={300 - padding - 32}
              y={targetY + 4}
              textAnchor="middle"
              className="text-xs font-medium"
              fill="rgb(34, 197, 94)"
            >
              Ціль {targetWeight}кг
            </text>
          </g>
        </svg>

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
