import FitnessCard from "../components/fitness/FitnessCard";
import fitnessData from "../data/fitnessData";
import WorkoutCard from "../components/fitness/WorkoutCard";

function Fitness() {
  
    

  return (
    <main className="main-content">
      <header className="fitness-header">
        <div>
          <p className="eyebrow">Fitness</p>
          <h1>Din träning</h1>
          <p>Planera passen, följ dina mål och se dina framsteg.</p>
        </div>

        <button className="primary-button" type="button">
          Logga träningspass
        </button>
      </header>

      <section className="fitness-grid">
      {fitnessData.map((card) =>
    card.exercises ? (
      <WorkoutCard key={card.id} card={card} />
    ) : (
      <FitnessCard key={card.id} card={card} />
    ),
  )}
</section>
    </main>
  );
  }

export default Fitness;