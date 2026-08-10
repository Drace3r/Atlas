import TableVisual from "./TableVisual";

function TableCard({
  table,
  getGuestById,
  dragging,
  onDragStart,
  onDrag,
  onDragEnd,
  selected,
  onSelect,
}) {
  return (
    <article
      className={`floor-table floor-table--${table.shape} ${
        dragging ? "floor-table--dragging" : ""
      } ${selected ? "floor-table--selected" : ""}`}
      style={{
        left: `${table.coordinates.x}px`,
        top: `${table.coordinates.y}px`,
      }}
      onPointerDown={(event) => {
        onSelect(table.id);
        onDragStart(table.id, event);
      }}
      onPointerMove={onDrag}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
    >
      <TableVisual table={table} getGuestById={getGuestById} />

      <div className="floor-table__meta">
        <strong>{table.name}</strong>
        <span>
          {table.guestIds.length}/{table.capacity} placerade
        </span>
      </div>
    </article>
  );
}

export default TableCard;
