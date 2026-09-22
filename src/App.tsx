import { HashRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import IdeasPage from "./pages/IdeasPage";
import PremisePage from "./pages/PremisePage";
import OutlinePage from "./pages/OutlinePage";
import ScenesPage from "./pages/ScenesPage";
import ScreenplayPage from "./pages/ScreenplayPage";

const STAGES = [
  { path: "/ideas", label: "Ideas" },
  { path: "/premise", label: "Premise" },
  { path: "/outline", label: "Outline" },
  { path: "/scenes", label: "Scenes" },
  { path: "/screenplay", label: "Screenplay" },
];

export default function App() {
  return (
    <HashRouter>
      <div className="shell">
        <nav className="stage-nav">
          <div className="stage-nav__title">Screenplay Studio</div>
          <ol className="stage-nav__list">
            {STAGES.map((stage) => (
              <li key={stage.path}>
                <NavLink
                  to={stage.path}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {stage.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <main className="stage-content">
          <Routes>
            <Route path="/" element={<Navigate to="/ideas" replace />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/premise" element={<PremisePage />} />
            <Route path="/outline" element={<OutlinePage />} />
            <Route path="/scenes" element={<ScenesPage />} />
            <Route path="/screenplay" element={<ScreenplayPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
