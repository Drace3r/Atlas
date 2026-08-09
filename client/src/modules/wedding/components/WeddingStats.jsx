import { useEffect, useState } from "react";
import DashboardCard from "../../../components/ui/DashboardCard";
import weddingService from "../services/weddingService";

const initialStats = {
  totalGuests: 0,
  attending: 0,
  pending: 0,
  declined: 0,
  allergies: 0,
};

function WeddingStats() {
  const [weddingStats, setWeddingStats] = useState(initialStats);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await weddingService.getStats();
        setWeddingStats(stats);
      } catch (error) {
        console.error("Kunde inte hämta Wedding-statistik:", error);
      }
    }

    loadStats();
  }, []);

  const responses = weddingStats.attending + weddingStats.declined;

  return (
    <section className="wedding-stats">
      <DashboardCard
        icon="👥"
        title="Totalt"
        heading={`${weddingStats.totalGuests} gäster`}
      />

      <DashboardCard icon="💌" title="Svar" heading={`${responses} RSVP`} />

      <DashboardCard
        icon="✅"
        title="Kommer"
        heading={`${weddingStats.attending} gäster`}
      />

      <DashboardCard
        icon="⏳"
        title="Väntar"
        heading={`${weddingStats.pending} gäster`}
      />
    </section>
  );
}

export default WeddingStats;
