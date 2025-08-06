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

interface MeasurementsRingsProps {
  measurements: MeasurementsData;
}

export default function MeasurementsRings({
  measurements,
}: MeasurementsRingsProps) {
  const ringSize = 120;
  const strokeWidth = 6;
  const center = ringSize / 2;

  // Calculate ring radii (from outer to inner) - 5 концентрических кругов
  const hipsRadius = center - strokeWidth; // Обхват бедер (внешний)
  const thighRadius = center - strokeWidth * 3; // Обхват бедра
  const waistRadius = center - strokeWidth * 5; // Обхват талии (средний)
  const chestRadius = center - strokeWidth * 7; // Обхват грудей
  const armRadius = center - strokeWidth * 9; // Обхват плеча (внутренний)

  // Calculate circumferences
  const hipsCircumference = 2 * Math.PI * hipsRadius;
  const thighCircumference = 2 * Math.PI * thighRadius;
  const waistCircumference = 2 * Math.PI * waistRadius;
  const chestCircumference = 2 * Math.PI * chestRadius;
  const armCircumference = 2 * Math.PI * armRadius;

  const getProgressPercentage = (current: number, target: number) => {
    // Для замеров прогресс может быть разным - иногда нужно увеличить, иногда уменьшить
    // Для простоты считаем прогресс как процент достижения цели
    return Math.min((current / target) * 100, 100);
  };

  // Calculate stroke dash offsets for progress
  const hipsProgress = getProgressPercentage(
    measurements.hips.current,
    measurements.hips.target
  );
  const thighProgress = getProgressPercentage(
    measurements.thigh.current,
    measurements.thigh.target
  );
  const waistProgress = getProgressPercentage(
    measurements.waist.current,
    measurements.waist.target
  );
  const chestProgress = getProgressPercentage(
    measurements.chest.current,
    measurements.chest.target
  );
  const armProgress = getProgressPercentage(
    measurements.arm.current,
    measurements.arm.target
  );

  const hipsOffset =
    hipsCircumference - (hipsProgress / 100) * hipsCircumference;
  const thighOffset =
    thighCircumference - (thighProgress / 100) * thighCircumference;
  const waistOffset =
    waistCircumference - (waistProgress / 100) * waistCircumference;
  const chestOffset =
    chestCircumference - (chestProgress / 100) * chestCircumference;
  const armOffset = armCircumference - (armProgress / 100) * armCircumference;

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
            r={hipsRadius}
            fill="none"
            stroke="rgba(139, 69, 19, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={thighRadius}
            fill="none"
            stroke="rgba(255, 165, 0, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={waistRadius}
            fill="none"
            stroke="rgba(255, 45, 85, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={chestRadius}
            fill="none"
            stroke="rgba(48, 209, 88, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={armRadius}
            fill="none"
            stroke="rgba(100, 210, 255, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress circles */}
          {/* Обхват бедер (внешний круг) - коричневый */}
          <circle
            cx={center}
            cy={center}
            r={hipsRadius}
            fill="none"
            stroke="#8B4513"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={hipsCircumference}
            strokeDashoffset={hipsOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Обхват бедра - оранжевый */}
          <circle
            cx={center}
            cy={center}
            r={thighRadius}
            fill="none"
            stroke="#FFA500"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={thighCircumference}
            strokeDashoffset={thighOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Обхват талии (средний круг) - красно-розовый */}
          <circle
            cx={center}
            cy={center}
            r={waistRadius}
            fill="none"
            stroke="#FF2D55"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={waistCircumference}
            strokeDashoffset={waistOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Обхват грудей - зеленый */}
          <circle
            cx={center}
            cy={center}
            r={chestRadius}
            fill="none"
            stroke="#30D158"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={chestCircumference}
            strokeDashoffset={chestOffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Обхват плеча (внутренний круг) - голубой */}
          <circle
            cx={center}
            cy={center}
            r={armRadius}
            fill="none"
            stroke="#64D2FF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={armCircumference}
            strokeDashoffset={armOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
