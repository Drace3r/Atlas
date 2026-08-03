import TableHeader from "./TableHeader";

function TableEditorPanel({
  table,
  onUpdateName,
  onRename,
  onUpdateCapacity,
  onUpdateShape,
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
          <h3>{table.name}</h3>
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
    </aside>
  );
}

export default TableEditorPanel;
