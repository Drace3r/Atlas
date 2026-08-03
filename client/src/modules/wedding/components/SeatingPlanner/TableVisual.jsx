function TableVisual({ table, getGuestById }) {
  const seats = Array.from({ length: table.capacity }, (_, index) => {
    const guestId = table.guestIds[index];
    const guest = guestId ? getGuestById(guestId) : null;

    return {
      index,
      guest,
    };
  });

  const topSeats = seats.slice(0, Math.ceil(seats.length / 2));
  const bottomSeats = seats.slice(Math.ceil(seats.length / 2));

  function renderSeat(seat, className = "") {
    return (
      <div
        key={seat.index}
        className={`table-seat ${className} ${
          seat.guest ? "table-seat--occupied" : "table-seat--empty"
        }`}
        title={seat.guest?.name ?? "Ledig plats"}
      >
        {seat.guest ? (
          <span className="table-seat__initials">
            {seat.guest.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
        ) : null}
      </div>
    );
  }

  if (table.shape === "round") {
    return (
      <div
        className="table-visual table-visual--round"
        aria-label={`Runt bord med ${table.capacity} platser`}
      >
        <div className="round-table-layout">
          {seats.map((seat) => (
            <div
              key={seat.index}
              className="round-seat-position"
              style={{
                "--seat-index": seat.index,
                "--seat-count": table.capacity,
              }}
            >
              {renderSeat(seat, "table-seat--round")}
            </div>
          ))}

          <div className="table-surface">
            <span>{table.name}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="table-visual table-visual--rectangular"
      aria-label={`Avlångt bord med ${table.capacity} platser`}
    >
      <div className="rectangular-table-layout">
        <div className="rectangular-seat-row">
          {topSeats.map((seat) => renderSeat(seat))}
        </div>

        <div className="table-surface">
          <span>{table.name}</span>
        </div>

        <div className="rectangular-seat-row">
          {bottomSeats.map((seat) => renderSeat(seat))}
        </div>
      </div>
    </div>
  );
}

export default TableVisual;
