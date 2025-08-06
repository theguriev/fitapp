import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Profile() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Profile</h1>
      <p className="text-lg text-gray-600">Manage your account settings</p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/workouts">Workouts</Link>
        </Button>
      </div>
    </div>
  );
}
