import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Dumbbell,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";
import Card from "../../shared/components/Card/Card";

const moduleConfig = {
  fitness: {
    icon: Dumbbell,
    path: "/fitness",
    action: "Öppna Fitness",
  },

  career: {
    icon: BriefcaseBusiness,
    path: "/career",
    action: "Öppna Career",
  },

  wedding: {
    icon: Heart,
    path: "/wedding",
    action: "Öppna Wedding",
  },

  ai: {
    icon: Bot,
    path: "/ai",
    action: "Öppna assistenten",
  },
};

function DashboardCard({ id, title, heading, description, path }) {
  const config = moduleConfig[id];

  if (!config) {
    return null;
  }

  const Icon = config.icon;
  const destination = path ?? config.path;

  return (
    <Link
      to={destination}
      className={`dashboard-card-link dashboard-card-link--${id}`}
      aria-label={`${config.action}: ${heading}`}
    >
      <Card>
        <div className="dashboard-card__top">
          <div className="dashboard-card__icon">
            <Icon size={23} strokeWidth={1.8} />
          </div>

          <ArrowUpRight
            className="dashboard-card__arrow"
            size={20}
            strokeWidth={1.8}
          />
        </div>

        <div className="dashboard-card__content">
          <p>{title}</p>
          <h3>{heading}</h3>

          {description && <span>{description}</span>}
        </div>

        <div className="dashboard-card__action">
          <span>{config.action}</span>

          <ArrowUpRight size={16} strokeWidth={2} />
        </div>
      </Card>
    </Link>
  );
}

export default DashboardCard;
