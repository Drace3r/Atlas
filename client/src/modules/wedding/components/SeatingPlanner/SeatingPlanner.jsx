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

const nextTableNumber = (tables) => tables.length + 1;

function SeatingPlanner() {
  const attendingGuests = weddingService.getAttendingGuests();
  const [tables, setTables] = useState(initialTables);

  function addTable() {
    setTables((currentTables) => [
      ...currentTables,
      {
        id: crypto.randomUUID(),
        name: `Bord ${nextTableNumber(currentTables)}`,
        capacity: 8,
        guestIds: [],
      },
    ]);
  }

  function updateTableName(tableId, newName) {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId
          ? { ...table, name: newName }
          : table
      )
    );
  }

  function renameTable(tableId, newName) {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      return;
    }

    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId
          ? { ...table, name: trimmedName }
          : table
      )
    );
  }

  function updateTableCapacity(tableId, newCapacity) {
    setTables((currentTables) =>
      currentTables.map((table) => {
        if (table.id !== tableId) {
          return table;
        }

        const parsedCapacity = Number(newCapacity);

const safeCapacity = Math.max(
  Number.isNaN(parsedCapacity) ? 0 : parsedCapacity,
  table.guestIds.length
);

        return {
          ...table,
          capacity: safeCapacity,
        };
      })
    );
  }

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

      <div className="section-actions">
        <button
          type="button"
          className="button button--primary"
          onClick={addTable}
        >
          + Lägg till bord
        </button>
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
                  onChange={(event) =>
                    assignGuestToTable(guest.id, event.target.value)
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
                <input
                  className="table-name-input"
                  type="text"
                  value={table.name}
                  onChange={(event) =>
                    updateTableName(table.id, event.target.value)
                  }
                  onBlur={(event) =>
                    renameTable(table.id, event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.currentTarget.blur();
                    }
                  }}
                  aria-label={`Namn på ${table.name}`}
                />

                <div className="table-capacity">
                  <span>{table.guestIds.length}/</span>

                  <input
                    type="number"
                    min={table.guestIds.length}
                    max={50}
                    value={table.capacity}
                    onChange={(event) =>
                      updateTableCapacity(
                        table.id,
                        event.target.value
                      )
                    }
                    aria-label={`Antal platser vid ${table.name}`}
                  />
                </div>
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
                      <li key={guest.id} className="seated-guest">
  <span>{guest.name}</span>

  <select
    value={table.id}
    onChange={(event) =>
      assignGuestToTable(guest.id, event.target.value)
    }
    aria-label={`Flytta ${guest.name} till ett annat bord`}
  >
    {tables.map((targetTable) => (
      <option
        key={targetTable.id}
        value={targetTable.id}
        disabled={
          targetTable.id !== table.id &&
          targetTable.guestIds.length >= targetTable.capacity
        }
      >
        {targetTable.name} – {targetTable.guestIds.length}/
        {targetTable.capacity}
      </option>
    ))}
  </select>

  <button
    type="button"
    className="button button--danger"
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