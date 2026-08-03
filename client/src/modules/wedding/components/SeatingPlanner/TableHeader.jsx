function TableHeader({
  table,
  onUpdateName,
  onRename,
  onUpdateCapacity,
  onUpdateShape,
}) {
  return (
    <>
      <div className="table-card_header">
        <input
          className="table-name-input"
          type="text"
          value={table.name}
          onChange={(event) => onUpdateName(table.id, event.target.value)}
          onBlur={(event) => onRename(table.id, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          aria-label={`namn på ${table.name}`}
        />
        <div className="table-capacity">
          <span>{table.guestIds.length}</span>
          <input
            type="number"
            min={table.guestIds.length}
            max={50}
            value={table.capacity}
            onChange={(event) => onUpdateCapacity(table.id, event.target.value)}
            aria-label={`Antal platser vid ${table.name}`}
          />
        </div>
      </div>

      <div className="table-shape">
        <label htmlFor={`shape-${table.id}`}>Bordsform</label>
        <select
          id={`shape-${table.id}`}
          value={table.shape}
          onChange={(event) => onUpdateShape(table.id, event.target.value)}
        >
          <option value="round">Runt bord</option>{" "}
          <option value="rectangular">Avlångt bord</option>
        </select>
      </div>
    </>
  );
}

export default TableHeader;
