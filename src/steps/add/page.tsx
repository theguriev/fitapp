import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddStepsPage() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("uk-UA", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // В реальном приложении здесь будет логика сохранения данных
    console.log("Добавление шагов:", {
      steps: parseInt(steps),
      date,
      time,
    });

    // Возвращаемся на страницу шагов
    navigate("/steps");
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col">
      {/* Header with back navigation */}
      <div className="bg-background border-border p-2">
        <div className="flex items-center gap-1">
          <Link
            to="/steps"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Кроки</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Додати кроки</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Steps Input */}
              <div className="space-y-2">
                <Label htmlFor="steps">Кількість кроків</Label>
                <Input
                  id="steps"
                  type="number"
                  placeholder="Введіть кількість кроків"
                  value={steps}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSteps(e.target.value)
                  }
                  required
                  min="0"
                  max="100000"
                />
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDate(e.target.value)
                  }
                  required
                />
              </div>

              {/* Time Input */}
              <div className="space-y-2">
                <Label htmlFor="time">Час</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTime(e.target.value)
                  }
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={!steps}>
                Додати кроки
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
