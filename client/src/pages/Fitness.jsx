import FitnessCard from "../components/fitness/FitnessCard";
import fitnessData from "../data/fitnessData";
import WorkoutCard from "../components/fitness/WorkoutCard";
import {useState} from "react";
import WorkoutLogger from "../components/fitness/WorkoutLogger";
import WorkoutHistory from "../components/fitness/WorkoutHistory";

function Fitness() {
  
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  return (
    <main className="main-content">
      <header className="fitness-header">
        <div>
          <p className="eyebrow">Fitness</p>
          <h1>Din träning</h1>
          <p>Planera passen, följ dina mål och se dina framsteg.</p>
        </div>

        <button 
        className="primary-button" 
        type="button"
        onClick={() => setIsLoggerOpen(true)}
        >
          Logga träningspass
        </button>
      </header>

      {isLoggerOpen && (
        <WorkoutLogger onClose={() => setIsLoggerOpen(false)}/>
      )}

      
<section className="fitness-grid">
  {fitnessData.map((card) =>
    card.exercises ? (
      <WorkoutCard key={card.id} card={card} />
    ) : (
      <FitnessCard key={card.id} card={card} />
    ),
  )}
</section>
<WorkoutHistory />


    </main>
  );
  }
  
export default Fitness;