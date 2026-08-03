function WelcomeCard({ name }) {
    return (
      <section className="welcome-card">
        <p className="eyebrow">ATLAS HOME</p>
        <h1>Välkommen tillbaka, {name}! 👋</h1>
        <p>Här samlar vi det viktigaste för din dag.</p>
      </section>
    );
  }
  
  export default WelcomeCard;