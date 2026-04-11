import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/widgets/navbar";
import { HomePage } from "@/pages/home";
import { ResumePage } from "@/pages/resume";

function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
