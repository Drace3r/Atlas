import { useEffect, useState } from "react";

import DashboardCard from "../../../components/ui/DashboardCard";
import { useApp } from "../../../context/AppContext";
import { getDashboardCards } from "../../../services/dashboardService";
import WelcomeCard from "../components/WelcomeCard";
import TodaysFocus from "../components/TodaysFocus";

function Dashboard() {
  const { settings, workoutLogs } = useApp();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function loadDashboardCards() {
      try {
        const dashboardCards = await getDashboardCards(settings, workoutLogs);

        if (isActive) {
          setCards(dashboardCards);
        }
      } catch (error) {
        console.error("Kunde inte hämta dashboardkorten:", error);
      }
    }

    loadDashboardCards();

    return () => {
      isActive = false;
    };
  }, [settings, workoutLogs]);

  return (
    <main className="main-content">
      <WelcomeCard name={settings.user.name} />

      <TodaysFocus />

      <section className="dashboard-grid">
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            id={card.id}
            title={card.title}
            heading={card.heading}
            description={card.description}
            path={card.path}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
