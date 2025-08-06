interface WeightDataPoint {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightDataPoint[];
}

export default function WeightChart({ data }: WeightChartProps) {
  const chartWidth = 280;
  const chartHeight = 120;
  const padding = 20;
  
  const weights = data.map(d => d.weight);
  const minWeight = Math.min(...weights) - 0.5;
  const maxWeight = Math.max(...weights) + 0.5;
  const weightRange = maxWeight - minWeight;
  
  // Создаем точки для линии
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((d.weight - minWeight) / weightRange) * (chartHeight - 2 * padding);
    return { x, y, weight: d.weight, date: d.date };
  });
  
  // Создаем path для линии
  const pathData = points.reduce((path, point, i) => {
    if (i === 0) {
      return `M ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, '');
  
  // Создаем градиентную область под линией
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;
  
  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-3 text-center">Динаміка ваги (7 днів)</div>
      <div className="relative bg-muted/30 rounded-lg p-4">
        <svg width={chartWidth} height={chartHeight} className="w-full h-auto">
          {/* Градиент для области под графиком */}
          <defs>
            <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Горизонтальные линии сетки */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight - padding - ratio * (chartHeight - 2 * padding);
            return (
              <line
                key={ratio}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="rgb(148, 163, 184)"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            );
          })}
          
          {/* Область под линией */}
          <path
            d={areaPath}
            fill="url(#weightGradient)"
          />
          
          {/* Основная линия */}
          <path
            d={pathData}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2.5"
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
                  r="6"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              )}
            </g>
          ))}
        </svg>
        
        {/* Подписи дат */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{new Date(data[0].date).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric' })}</span>
          <span>Сьогодні</span>
        </div>
      </div>
    </div>
  );
}
