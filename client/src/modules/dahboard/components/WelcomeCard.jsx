import { Sparkles } from "lucide-react";

function WelcomeCard({ name }) {
  return (
    <section className="welcome-card">
      <div className="welcome-card__content">
        <p className="eyebrow">Atlas Home</p>

        <h1>
          Välkommen tillbaka, <span>{name}</span>.
        </h1>

        <p className="welcome-card__description">
          Din samlade plats för att planera, bygga och utvecklas.
        </p>

        <div className="welcome-card__motto">
          <Sparkles size={16} strokeWidth={1.8} />

          <span>Plan. Build. Grow.</span>
        </div>
      </div>

      <div className="welcome-card__visual" aria-hidden="true">
        <div className="atlas-orbit atlas-orbit--outer" />
        <div className="atlas-orbit atlas-orbit--inner" />

        <div className="atlas-orbit__dot atlas-orbit__dot--one" />
        <div className="atlas-orbit__dot atlas-orbit__dot--two" />

        <div className="atlas-orbit__core">A</div>
      </div>
    </section>
  );
}

export default WelcomeCard;
