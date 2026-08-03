function SeatedGuest({
    guest,
    table,
    tables,
    onAssignGuest,
    onRemoveGuest,
  }) {
    return (
      <li className="seated-guest">
        <span>{guest.name}</span>
  
        <select
          value={table.id}
          onChange={(event) =>
            onAssignGuest(guest.id, event.target.value)
          }
          aria-label={`Flytta ${guest.name} till ett annat bord`}
        >
          {tables.map((targetTable) => (
            <option
              key={targetTable.id}
              value={targetTable.id}
              disabled={
                targetTable.id !== table.id &&
                targetTable.guestIds.length >=
                  targetTable.capacity
              }
            >
              {targetTable.name} –{" "}
              {targetTable.guestIds.length}/
              {targetTable.capacity}
            </option>
          ))}
        </select>
  
        <button
          type="button"
          className="button button--danger"
          onClick={() => onRemoveGuest(guest.id)}
          aria-label={`Ta bort ${guest.name} från ${table.name}`}
        >
          Ta bort
        </button>
      </li>
    );
  }
  
  export default SeatedGuest;