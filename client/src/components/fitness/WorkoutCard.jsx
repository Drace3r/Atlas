import { useState } from "react";
import { Check, Circle } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import workouts from "../../data/workouts";

function WorkoutCard({ card }) {
    const [selectedWorkoutId, setSelectedWorkoutId] = useState("push");
    const [completedByWorkout, setCompletedByWorkout] = useState({
        push: [],
        pull: [],
        legs: [],
      });
      const completedExerciseIds = 
      completedByWorkout[selectedWorkoutId] ?? [];
  
    const selectedWorkout = workouts[selectedWorkoutId];

    function toggleExercise(exerciseId) {
        setCompletedByWorkout((currentState) => {
          const currentIds = currentState[selectedWorkoutId] ?? [];
          const isCompleted = currentIds.includes(exerciseId);
      
          const updatedIds = isCompleted
            ? currentIds.filter((id) => id !== exerciseId)
            : [...currentIds, exerciseId];
      
          return {
            ...currentState,
            [selectedWorkoutId]: updatedIds,
          };
        });
      }

  const completedCount = completedExerciseIds.length;
  const totalExercises = selectedWorkout.exercises.length;

  const progress =
    totalExercises > 0
      ? Math.round((completedCount / totalExercises) * 100)
      : 0;

  const Icon = card.icon;

  return (
    <article className="fitness-card workout-card">
      <div className="fitness-card-icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <p>{card.title}</p>
      <h2>{selectedWorkout.name} Day</h2>
      <div className="workout-selector">
  {Object.values(workouts).map((workout) => (
    <button
      key={workout.id}
      type="button"
      className={`workout-selector-button ${
        selectedWorkoutId === workout.id ? "active" : ""
      }`}
      onClick={() => setSelectedWorkoutId(workout.id)}
    >
      {workout.name}
    </button>
  ))}
</div>

      <span>
        {completedCount} av {totalExercises} övningar klara
      </span>

      <div className="exercise-list">
      {selectedWorkout.exercises.map((exercise) => {
          const isCompleted = completedExerciseIds.includes(exercise.id);

          return (
            <button
              className={`exercise-item ${isCompleted ? "completed" : ""}`}
              key={exercise.id}
              type="button"
              onClick={() => toggleExercise(exercise.id)}
            >
              {isCompleted ? (
                <Check size={18} aria-hidden="true" />
              ) : (
                <Circle size={18} aria-hidden="true" />
              )}

              <span>{exercise.name}</span>
            </button>
          );
        })}
      </div>

      <ProgressBar value={progress} label="Passförlopp" />
    </article>
  );
}

export default WorkoutCard;