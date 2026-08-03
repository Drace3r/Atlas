function FloorPlan({ children }) {
  return (
    <section className="floor-plan">
      <div className="floor-plan__canvas">{children}</div>
    </section>
  );
}

export default FloorPlan;
