import { useEffect, useState } from "react";
import weddingService from "../services/weddingService";

const initialStats = {
  totalGuests: 0,
  attending: 0,
  pending: 0,
  declined: 0,
  allergies: 0,
};

function WeddingOverviewCards() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    async function loadStats() {
      try {
        const weddingStats = await weddingService.getStats();

        setStats(weddingStats);
      } catch (error) {
        console.error("Kunde inte hämta Wedding-statistik:", error);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      label: "Gäster",
      value: stats.totalGuests,
    },
    {
      label: "Kommer",
      value: stats.attending,
    },
    {
      label: "Ej svarat",
      value: stats.pending,
    },
    {
      label: "Allergier",
      value: stats.allergies,
    },
  ];

  return (
    <section className="overview-cards">
      {cards.map((card) => (
        <article key={card.label} className="overview-card">
          <p>{card.label}</p>
          <h2>{card.value}</h2>
        </article>
      ))}
    </section>
  );
}

export default WeddingOverviewCards;
