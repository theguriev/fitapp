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

  // Calculate ring radii (from outer to inner) - 5 концентричних кіл
  const hipsRadius = center - strokeWidth; // Обхват стегон (зовнішній)
  const thighRadius = center - strokeWidth * 3; // Обхват стегна
  const waistRadius = center - strokeWidth * 5; // Обхват талії (середній)
  const chestRadius = center - strokeWidth * 7; // Обхват грудей
  const armRadius = center - strokeWidth * 9; // Обхват плеча (внутрішній)

  // Calculate circumferences
  const hipsCircumference = 2 * Math.PI * hipsRadius;
  const thighCircumference = 2 * Math.PI * thighRadius;
  const waistCircumference = 2 * Math.PI * waistRadius;
  const chestCircumference = 2 * Math.PI * chestRadius;
  const armCircumference = 2 * Math.PI * armRadius;

  const getProgressPercentage = (current: number, target: number) => {
    // Для замірів прогрес може бути різним - іноді потрібно збільшити, іноді зменшити
    // Для простоти вважаємо прогрес як відсоток досягнення мети
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
          {/* Обхват стегон (зовнішнє кільце) - коричневий */}
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

          {/* Обхват стегна - помаранчевий */}
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

          {/* Обхват талії (середнє кільце) - червоно-рожевий */}
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

          {/* Обхват грудей - зелений */}
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

          {/* Обхват плеча (внутрішнє кільце) - блакитний */}
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
