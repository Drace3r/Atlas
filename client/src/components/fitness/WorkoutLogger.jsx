import { useState } from "react";
import { useApp } from "../../context/AppContext";
import workouts from "../../data/workouts";
import Button from "../ui/Button"

function WorkoutLogger({ onClose }) {
  const { addWorkoutLog } = useApp();

  const [workoutId, setWorkoutId] = useState("push");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const selectedWorkout = workouts[workoutId];
    const parsedDuration = Number(duration);

    if (!selectedWorkout || parsedDuration <= 0) {
      return;
    }

    addWorkoutLog({
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.name,
      duration: parsedDuration,
      notes: notes.trim(),
    });

    setDuration("");
    setNotes("");
    setSaved(true);
  }

  return (
    <section className="workout-logger">
      <div className="workout-logger-header">
        <div>
          <p className="eyebrow">Workout Logger</p>
          <h2>Logga träningspass</h2>
        </div>

        <button
          className="secondary"
          type="button"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Pass</span>

          <select
            value={workoutId}
            onChange={(event) => {
              setWorkoutId(event.target.value);
              setSaved(false);
            }}
          >
            {Object.values(workouts).map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Längd i minuter</span>

          <input
            type="number"
            min="1"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
              setSaved(false);
            }}
            placeholder="60"
            required
          />
        </label>

        <label className="form-field">
          <span>Anteckningar</span>

          <textarea
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
              setSaved(false);
            }}
            placeholder="Hur kändes passet?"
            rows="4"
          />
        </label>

        <div className="settings-actions">
          <button type="submit">
            Spara träningspass
          </button>

          {saved && (
            <p className="save-message" role="status">
              Träningspasset har sparats.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default WorkoutLogger;