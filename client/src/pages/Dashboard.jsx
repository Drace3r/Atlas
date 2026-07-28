import Header from "../components/layout/Header";
import DashboardCard from "../components/DashboardCard";
import dashboardCards from "../data/dashboardData";

function Dashboard() {
    
    return (
    <main className="main-content">
      <Header />
      <section className="dashboard-grid">  
      {dashboardCards.map((card)=> (
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