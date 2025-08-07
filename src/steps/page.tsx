import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function StepsPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f5]">
      {/* Header with back navigation */}
      <div className="bg-background border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Кроки</h1>
        </div>
      </div>

      {/* Content - пока что пустой */}
      <div className="p-4">
        <p className="text-muted-foreground">Страница шагов в разработке...</p>
      </div>
    </div>
  );
}
