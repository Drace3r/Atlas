import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">Forsemalm Hub</h1>

      <nav className="navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/fitness"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Fitness
        </NavLink>

        <NavLink
          to="/career"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Career
        </NavLink>

        <NavLink
          to="/wedding"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Wedding
        </NavLink>

        <NavLink
          to="/ai"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          AI Assistant
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;