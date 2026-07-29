import { useState } from "react";
import {
  CalendarDays,
  Dumbbell,
  Pencil,
  Timer,
  Trash2,
} from "lucide-react";

import { useApp } from "../../context/AppContext";

import Button from "../ui/Button"

function WorkoutHistory() {
  const {
    workoutLogs,
    updateWorkoutLog,
    deleteWorkoutLog,
  } = useApp();

  const [editingId, setEditingId] = useState(null);
  const [editDuration, setEditDuration] = useState("");
  const [editNotes, setEditNotes] = useState("");

  function isSameDay(firstDate, secondDate) {
    return (
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate()
    );
  }

  function formatWorkoutDate(dateString) {
    const workoutDate = new Date(dateString);
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const time = new Intl.DateTimeFormat("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(workoutDate);

    if (isSameDay(workoutDate, today)) {
      return `Idag ${time}`;
    }

    if (isSameDay(workoutDate, yesterday)) {
      return `Igår ${time}`;
    }

    const date = new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "short",
    }).format(workoutDate);

    return `${date} ${time}`;
  }

  function startEditing(workout) {
    setEditingId(workout.id);
    setEditDuration(String(workout.duration));
    setEditNotes(workout.notes ?? "");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditDuration("");
    setEditNotes("");
  }

  function saveWorkout(workoutId) {
    const parsedDuration = Number(editDuration);

    if (!Number.isFinite(parsedDuration) || parsedDuration <= 0) {
      return;
    }

    updateWorkoutLog(workoutId, {
      duration: parsedDuration,
      notes: editNotes.trim(),
    });

    cancelEditing();
  }

  return (
    <section className="workout-history">
      <div className="workout-history-header">
        <div>
          <p className="eyebrow">History</p>
          <h2>Träningshistorik</h2>
        </div>

        <span>{workoutLogs.length} sparade pass</span>
      </div>

      {workoutLogs.length === 0 ? (
        <div className="workout-history-empty">
          <Dumbbell size={30} aria-hidden="true" />
          <h3>Ingen träningshistorik ännu</h3>
          <p>Dina sparade träningspass kommer att visas här.</p>
        </div>
      ) : (
        <div className="workout-history-list">
          {workoutLogs.map((workout) => {
            const isEditing = editingId === workout.id;

            return (
              <article
                className="workout-history-item"
                key={workout.id}
              >
                <div className="workout-history-main">
                  <div className="workout-history-icon">
                    <Dumbbell size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <h3>{workout.workoutName}</h3>

                    <p className="workout-history-date">
                      <CalendarDays
                        size={15}
                        aria-hidden="true"
                      />

                      {formatWorkoutDate(workout.date)}
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="workout-edit-form">
                    <label className="form-field">
                      <span>Längd i minuter</span>

                      <input
                        type="number"
                        min="1"
                        value={editDuration}
                        onChange={(event) =>
                          setEditDuration(event.target.value)
                        }
                      />
                    </label>

                    <label className="form-field">
                      <span>Anteckningar</span>

                      <textarea
                        rows="3"
                        value={editNotes}
                        onChange={(event) =>
                          setEditNotes(event.target.value)
                        }
                      />
                    </label>

                    <div className="history-actions">
                      <button
                         type="button"
                        onClick={() => saveWorkout(workout.id)}
                      >
                        Spara
                      </button>

                      <button
                        variant="secondary"
                        type="button"
                        onClick={cancelEditing}
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="workout-history-details">
                    <strong className="workout-duration">
                      <Timer size={16} aria-hidden="true" />
                      {workout.duration} min
                    </strong>

                    {workout.notes && (
                      <span>{workout.notes}</span>
                    )}

                    <div className="history-actions">
                      <button
                        variant="secondary"
                        type="button"
                        onClick={() => startEditing(workout)}
                      >
                        <Pencil size={15} aria-hidden="true" />
                        Redigera
                      </button>

                      <button
                        variant="danger"
                        type="button"
                        onClick={() =>
                          deleteWorkoutLog(workout.id)
                        }
                        aria-label={`Ta bort ${workout.workoutName}`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Ta bort
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default WorkoutHistory;