function UnassignedGuests({
    guests,
    tables,
    onAssignGuest,
  }) {
    return (
      <aside className="unassigned-guests">
        <h3>Ej placerade</h3>
  
        {guests.length === 0 ? (
          <p>Alla gäster är placerade.</p>
        ) : (
          guests.map((guest) => (
            <article key={guest.id} className="guest-chip">
              <span>{guest.name}</span>
  
              <select
                defaultValue=""
                onChange={(event) =>
                  onAssignGuest(guest.id, event.target.value)
                }
                aria-label={`Välj bord för ${guest.name}`}
              >
                <option value="" disabled>
                  Välj bord
                </option>
  
                {tables.map((table) => (
                  <option
                    key={table.id}
                    value={table.id}
                    disabled={
                      table.guestIds.length >= table.capacity
                    }
                  >
                    {table.name} – {table.guestIds.length}/
                    {table.capacity}
                  </option>
                ))}
              </select>
            </article>
          ))
        )}
      </aside>
    );
  }
  
  export default UnassignedGuests;