import { Routes, Route } from "react-router";
import Providers from "./components/providers";
import { Toaster } from "@/components/ui/sonner";
import Home from "./page";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import StepsPage from "./steps/page";
import WeightPage from "./weight/page";
import MeasurementsPage from "./measurements/page";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/steps" element={<StepsPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/measurements" element={<MeasurementsPage />} />
      </Routes>
      <Toaster />
    </Providers>
  );
}

export default App;
