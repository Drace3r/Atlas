import { useState } from "react";
import weddingService from "../../services/weddingService";



const initialTables = [
  {
    id: "table-1",
    name: "Bord 1",
    capacity: 8,
    guestIds: [],
  },
  {
    id: "table-2",
    name: "Bord 2",
    capacity: 8,
    guestIds: [],
  },
];

function SeatingPlanner() {
  const attendingGuests = weddingService.getAttendingGuests();

  const [tables, setTables] = useState(initialTables);

  

  function assignGuestToTable(guestId, tableId) {
    setTables((currentTables) =>
      currentTables.map((table) => {
        const guestIdsWithoutGuest = table.guestIds.filter(
          (id) => id !== guestId
        );

        if (table.id !== tableId) {
          return {
            ...table,
            guestIds: guestIdsWithoutGuest,
          };
        }

        if (guestIdsWithoutGuest.length >= table.capacity) {
          return table;
        }

        return {
          ...table,
          guestIds: [...guestIdsWithoutGuest, guestId],
        };
      })
    );
  }

  function removeGuestFromTable(guestId) {
    setTables((currentTables) =>
      currentTables.map((table) => ({
        ...table,
        guestIds: table.guestIds.filter((id) => id !== guestId),
      }))
    );
  }

  function getGuestById(guestId) {
    return attendingGuests.find((guest) => guest.id === guestId);
  }

  const assignedGuestIds = tables.flatMap((table) => table.guestIds);

  const unassignedGuests = attendingGuests.filter(
    (guest) => !assignedGuestIds.includes(guest.id)
  );

  return (
    <section className="seating-planner">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BORDSPLACERING</p>
          <h2>Placera gäster</h2>
        </div>

        <span>
          {assignedGuestIds.length}/{attendingGuests.length} placerade
        </span>
      </div>

      <div className="seating-layout">
        <aside className="unassigned-guests">
          <h3>Ej placerade</h3>

          {unassignedGuests.length === 0 ? (
            <p>Alla gäster är placerade.</p>
          ) : (
            unassignedGuests.map((guest) => (
              <article key={guest.id} className="guest-chip">
                <span>{guest.name}</span>

                <select
                  defaultValue=""
                  onChange={(event) => {
                    assignGuestToTable(guest.id, event.target.value);
                  }}
                  aria-label={`Välj bord för ${guest.name}`}
                >
                  <option value="" disabled>
                    Välj bord
                  </option>

                  {tables.map((table) => (
                    <option
                      key={table.id}
                      value={table.id}
                      disabled={table.guestIds.length >= table.capacity}
                    >
                      {table.name} – {table.guestIds.length}/{table.capacity}
                    </option>
                  ))}
                </select>
              </article>
            ))
          )}
        </aside>

        <div className="table-grid">
          {tables.map((table) => (
            <article key={table.id} className="table-card">
              <div className="table-card__header">
                <h3>{table.name}</h3>

                <span>
                  {table.guestIds.length}/{table.capacity}
                </span>
              </div>

              {table.guestIds.length === 0 ? (
                <p>Inga gäster placerade ännu.</p>
              ) : (
                <ul>
                  {table.guestIds.map((guestId) => {
                    const guest = getGuestById(guestId);

                    if (!guest) {
                      return null;
                    }

                    return (
                      <li key={guest.id}>
                        <span>{guest.name}</span>

                        <button
                          type="button"
                          onClick={() => removeGuestFromTable(guest.id)}
                          aria-label={`Ta bort ${guest.name} från ${table.name}`}
                        >
                          Ta bort
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeatingPlanner;