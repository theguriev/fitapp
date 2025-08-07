import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

export default function StepsPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f5]">
      {/* Header with back navigation */}
      <div className="bg-background border-border p-2">
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Головна</h1>
        </div>
      </div>

      {/* Content - пока что пустой */}
      <div className="p-4">
        <p className="text-muted-foreground">Страница шагов в разработке...</p>
      </div>
    </div>
  );
}
