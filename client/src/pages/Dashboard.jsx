import Header from "../components/layout/Header";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
    const cards = [
        {
            icon: "💪",
            title: "Fitness",
            heading: "3 pass denna vecka",
            description: "Nästa mål: 4 pass",
        },
        {
            icon: "💼",
            title: "Career",
            heading: "5 aktiva ansökningar",
            description: "1 intervju bokad",
        },
        {
            icon: "💍",
            title: "Wedding",
            heading:"57 gäster",
            description:"5 svar väntar",
        },
    ];
 
    return (
    <main className="main-content">
      <Header />
      <section>  
      {cards.map((card)=> (
        <DashboardCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          heading={card.heading}
          description={card.description}
        />
        ))}
        
        <DashboardCard
          icon="🤖"
          title="AI Assistant"
          heading="Vad behöver du hjälp med?"
        >
          <button className="card-button" type="button">
            Öppna assistenten
          </button>
        </DashboardCard>
      </section>
    </main>
  );
}

export default Dashboard;