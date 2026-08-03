import DashboardCard from "../../../components/ui/DashboardCard";
import weddingService from "../services/weddingService";

function WeddingStats() {
  const weddingStats = weddingService.getStats();

  return (
    <section className="dashboard-grid">
      <DashboardCard
        icon="👥"
        title="Totalt"
        heading={`${weddingStats.totalGuests} gäster`}
      />

      <DashboardCard
        icon="💌"
        title="Svar"
        heading={`${weddingStats.responses} RSVP`}
      />

      <DashboardCard
        icon="✅"
        title="Kommer"
        heading={`${weddingStats.attending} gäster`}
      />

      <DashboardCard
        icon="⏳"
        title="Väntar"
        heading={`${weddingStats.waiting} gäster`}
      />
    </section>
  );
}

export default WeddingStats;