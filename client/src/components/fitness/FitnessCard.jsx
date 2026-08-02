import ProgressBar from "../../shared/components/Progressbar/ProgressBar";
import {getWeeklyProgress} from "../../modules/fitness/services/fitnessService";

function FitnessCard({ card }) {
  const Icon = card.icon;

  const hasGoal =
    typeof card.completed === "number" &&
    typeof card.goal === "number" &&
    card.goal > 0;

    const weeklyProgress = getWeeklyProgress(
        card.completed,
        card.goal,
      );

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
        {weeklyProgress.completed} av {weeklyProgress.goal} pass
            </span>

        <ProgressBar
        value={weeklyProgress.percentage}
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