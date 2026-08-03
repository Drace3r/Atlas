import weddingService from "../services/weddingService";

function WeddingOverviewCards() {
  const stats = weddingService.getStats();

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