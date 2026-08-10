import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import { Dashboard } from "./modules/dahboard";
import Fitness from "./pages/Fitness";
import Career from "./pages/Career";
import { Wedding } from "./modules/wedding";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/welcome.css";
import "./styles/dashboard.css";
import "./styles/editable-list.css";
import "./styles/fitness.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/responsive.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/career" element={<Career />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
