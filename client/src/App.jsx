import {Route, Routes} from "react-router-dom";
import "./App.css";


import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Fitness from "./pages/Fitness";
import Career from "./pages/Career";
import Wedding from "./pages/Wedding";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="app">
      <Sidebar />
      
      <Routes>
        <Route path="/" element={<Dashboard />}/>
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