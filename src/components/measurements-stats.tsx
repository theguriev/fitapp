interface MeasurementData {
  current: number;
  target: number;
  name: string;
}

interface MeasurementsData {
  arm: MeasurementData;
  chest: MeasurementData;
  waist: MeasurementData;
  thigh: MeasurementData;
  hips: MeasurementData;
}

interface MeasurementsStatsProps {
  measurements: MeasurementsData;
}

export default function MeasurementsStats({
  measurements,
}: MeasurementsStatsProps) {
  const measurementsList = [
    { key: "arm", color: "#64D2FF", data: measurements.arm },
    { key: "chest", color: "#30D158", data: measurements.chest },
    { key: "waist", color: "#FF2D55", data: measurements.waist },
    { key: "thigh", color: "#FFA500", data: measurements.thigh },
    { key: "hips", color: "#8B4513", data: measurements.hips },
  ];

  const getDifference = (current: number, target: number) => {
    const diff = current - target;
    return {
      value: Math.abs(diff),
      isPositive: diff > 0,
      isTarget: Math.abs(diff) < 0.5, // Считаем достигнутой цель если разница меньше 0.5 см
    };
  };

  return (
    <div className="space-y-3 w-full">
      {measurementsList.map(({ key, color, data }) => {
        const difference = getDifference(data.current, data.target);

        return (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              ></div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-muted-foreground truncate">
                  {data.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium">{data.current} см</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{data.target} см</span>

              {difference.isTarget ? (
                <span className="text-green-600 font-medium ml-2">✓</span>
              ) : (
                <span
                  className={`font-medium ml-2 ${
                    difference.isPositive ? "text-orange-600" : "text-blue-600"
                  }`}
                >
                  {difference.isPositive ? "+" : "-"}
                  {difference.value.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Общая информация */}
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            📏 Останній замір: сьогодні
          </span>
        </div>
      </div>
    </div>
  );
}
