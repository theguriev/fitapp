interface ActivityRingsProps {
  proteins: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fats: { consumed: number; target: number };
}

export default function ActivityRings({
  proteins,
  carbs,
  fats,
}: ActivityRingsProps) {
  const ringSize = 120;
  const strokeWidth = 8;
  const center = ringSize / 2;

  // Calculate ring radii (from outer to inner) - like Apple Activity Rings
  const fatsRadius = center - strokeWidth; // Жиры (внешний)
  const carbsRadius = center - strokeWidth * 3; // Углеводы (средний)
  const proteinsRadius = center - strokeWidth * 5; // Белки (внутренний)

  // Calculate circumferences
  const fatsCircumference = 2 * Math.PI * fatsRadius;
  const carbsCircumference = 2 * Math.PI * carbsRadius;
  const proteinsCircumference = 2 * Math.PI * proteinsRadius;

  const getProgressPercentage = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100);
  };

  // Calculate stroke dash offsets for progress
  const fatsProgress = getProgressPercentage(fats.consumed, fats.target);
  const carbsProgress = getProgressPercentage(carbs.consumed, carbs.target);
  const proteinsProgress = getProgressPercentage(
    proteins.consumed,
    proteins.target
  );

  const fatsOffset =
    fatsCircumference - (fatsProgress / 100) * fatsCircumference;
  const carbsOffset =
    carbsCircumference - (carbsProgress / 100) * carbsCircumference;
  const proteinsOffset =
    proteinsCircumference - (proteinsProgress / 100) * proteinsCircumference;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        <svg
          width={ringSize}
          height={ringSize}
          className="transform -rotate-90"
        >
          {/* Background circles with opacity */}
          <circle
            cx={center}
            cy={center}
            r={fatsRadius}
            fill="none"
            stroke="rgba(255, 45, 85, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={carbsRadius}
            fill="none"
            stroke="rgba(48, 209, 88, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={proteinsRadius}
            fill="none"
            stroke="rgba(100, 210, 255, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress circles */}
          {/* Жиры (внешний круг) - красный/розовый */}
          <circle
            cx={center}
            cy={center}
            r={fatsRadius}
            fill="none"
            stroke="#FF2D55"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={fatsCircumference}
            strokeDashoffset={fatsOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Углеводы (средний круг) - зеленый */}
          <circle
            cx={center}
            cy={center}
            r={carbsRadius}
            fill="none"
            stroke="#30D158"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={carbsCircumference}
            strokeDashoffset={carbsOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Белки (внутренний круг) - голубой */}
          <circle
            cx={center}
            cy={center}
            r={proteinsRadius}
            fill="none"
            stroke="#64D2FF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={proteinsCircumference}
            strokeDashoffset={proteinsOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
