import Header from "../components/layout/Header";
import DashboardCard from "../components/DashboardCard";
import {useApp} from "../context/AppContext"
import { getDashboardCards } from "../services/dashboardService"

function Dashboard() {
  const { settings, workoutLogs } = useApp();

  const cards = getDashboardCards(
    settings,
    workoutLogs,
  );


    return (
    <main className="main-content">
      <Header />
      <section className="dashboard-grid">  
      {cards.map((card)=> (
        <DashboardCard
          key={card.title}
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