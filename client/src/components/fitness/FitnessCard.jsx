import ProgressBar from "../ui/ProgressBar";

function FitnessCard({ card }) {
  const Icon = card.icon;

  const hasGoal =
    typeof card.completed === "number" &&
    typeof card.goal === "number" &&
    card.goal > 0;

  const progress = hasGoal
    ? Math.round((card.completed / card.goal) * 100)
    : 0;

  return (
    <article className="fitness-card">
      <div className="fitness-card-icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <p>{card.title}</p>

      {card.heading && <h2>{card.heading}</h2>}

      {hasGoal ? (
        <>
          <span>
            {card.completed} av {card.goal} pass
          </span>

          <ProgressBar
            value={progress}
            label="Veckans framsteg"
          />
        </>
      ) : (
        card.description && <span>{card.description}</span>
      )}
    </article>
  );
}

export default FitnessCard;