import {
  Bot,
  BriefcaseBusiness,
  Dumbbell,
  Heart,
  House,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: House,
      end: true,
    },
    {
      name: "Fitness",
      path: "/fitness",
      icon: Dumbbell,
    },
    {
      name: "Career",
      path: "/career",
      icon: BriefcaseBusiness,
    },
    {
      name: "Wedding",
      path: "/wedding",
      icon: Heart,
    },
    {
      name: "AI Assistant",
      path: "/ai",
      icon: Bot,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">Atlas</h1>

      <nav className="navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;