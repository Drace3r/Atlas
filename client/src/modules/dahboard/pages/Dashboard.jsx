import DashboardCard from "../../../components/ui/DashboardCard";
import { useApp } from "../../../context/AppContext";
import { getDashboardCards } from "../../../services/dashboardService";
import WelcomeCard from "../components/WelcomeCard";
import TodaysFocus from "../components/TodaysFocus";

function Dashboard() {
  const { settings, workoutLogs } = useApp();

  const cards = getDashboardCards(settings, workoutLogs);

  return (
    <main className="main-content">
      <WelcomeCard name={settings.user.name} />
      <TodaysFocus />
      <section className="dashboard-grid">
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            heading={card.heading}
            description={card.description}
          >
            {card.id === "ai" && (
              <button className="card-button" type="button">
                Öppna assistenten
              </button>
            )}
          </DashboardCard>
        ))}
      </section>
    </main>
  );
}

export default Dashboard;