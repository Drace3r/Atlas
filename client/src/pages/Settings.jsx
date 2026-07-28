import { useState } from "react";
import { useApp } from "../context/AppContext";

function Settings() {
  const { settings, setSettings } = useApp();

  const [name, setName] = useState(settings.user.name);
  const [initials, setInitials] = useState(settings.user.initials);
  const [weeklyGoal, setWeeklyGoal] = useState(
    settings.fitness.weeklyGoal,
  );
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedInitials = initials.trim().toUpperCase();

    if (!trimmedName || !trimmedInitials) {
      return;
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      user: {
        ...currentSettings.user,
        name: trimmedName,
        initials: trimmedInitials,
      },
      fitness: {
        ...currentSettings.fitness,
        weeklyGoal: Number(weeklyGoal),
      },
    }));

    setSaved(true);
  }

  function handleInputChange(setValue) {
    return (event) => {
      setValue(event.target.value);
      setSaved(false);
    };
  }

  return (
    <main className="main-content">
      <header className="settings-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Inställningar</h1>
          <p>Anpassa Forsemalm Hub efter dig och dina mål.</p>
        </div>
      </header>

      <section className="settings-section">
        <div className="settings-section-header">
          <h2>Profil</h2>
          <p>Informationen används i hela appen.</p>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Namn</span>

            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Ditt namn"
              required
            />
          </label>

          <label className="form-field">
            <span>Initialer</span>

            <input
              type="text"
              value={initials}
              onChange={handleInputChange(setInitials)}
              placeholder="JF"
              maxLength={3}
              required
            />
          </label>
          <label className="form-field">
  <span>Veckomål för träning</span>

  <input
    type="number"
    min="1"
    max="14"
    value={weeklyGoal}
    onChange={(event) => {
      setWeeklyGoal(event.target.value);
      setSaved(false);
    }}
    required
  />
</label>
         

          <div className="settings-actions">
            <button className="primary-button" type="submit">
              Spara ändringar
            </button>

            {saved && (
              <p className="save-message" role="status">
                Inställningarna har sparats.
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default Settings;