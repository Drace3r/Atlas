import TableHeader from "./TableHeader";

function TableEditorPanel({
  table,
  onUpdateName,
  onRename,
  onUpdateCapacity,
  onUpdateShape,
  onDelete,
  onClose,
}) {
  if (!table) {
    return (
      <aside className="table-editor table-editor--empty">
        <p>Välj ett bord i planritningen för att redigera det.</p>
      </aside>
    );
  }

  return (
    <aside className="table-editor">
      <div className="table-editor__header">
        <div>
          <p className="eyebrow">VALT BORD</p>
          <h2>{table.name}</h2>
        </div>

        <button
          type="button"
          className="table-editor__close"
          onClick={onClose}
          aria-label="Stäng redigeringspanelen"
        >
          ×
        </button>
      </div>

      <TableHeader
        table={table}
        onUpdateName={onUpdateName}
        onRename={onRename}
        onUpdateCapacity={onUpdateCapacity}
        onUpdateShape={onUpdateShape}
      />

      <div className="table-editor__summary">
        <span>Placerade gäster</span>

        <strong>
          {table.guestIds.length}/{table.capacity}
        </strong>
      </div>

      <div className="table-editor__danger-zone">
        <button
          type="button"
          className="button table-editor__delete"
          onClick={() => onDelete(table.id)}
        >
          Ta bort bord
        </button>
      </div>
    </aside>
  );
}

export default TableEditorPanel;
