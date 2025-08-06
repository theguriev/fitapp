interface MacroStatsProps {
  proteins: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fats: { consumed: number; target: number };
}

export default function MacroStats({ proteins, carbs, fats }: MacroStatsProps) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#64D2FF" }}
          ></div>
          <span className="text-sm text-muted-foreground">Білки</span>
        </div>
        <span className="text-xs">
          {proteins.consumed}г / {proteins.target}г
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#30D158" }}
          ></div>
          <span className="text-sm text-muted-foreground">Вуглеводи</span>
        </div>
        <span className="text-xs">
          {carbs.consumed}г / {carbs.target}г
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#FF2D55" }}
          ></div>
          <span className="text-sm text-muted-foreground">Жири</span>
        </div>
        <span className="text-xs">
          {fats.consumed}г / {fats.target}г
        </span>
      </div>
    </div>
  );
}
