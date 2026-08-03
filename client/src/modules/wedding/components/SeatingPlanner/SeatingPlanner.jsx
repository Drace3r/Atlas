import { useRef, useState } from "react";
import weddingService from "../../services/weddingService";
import UnassignedGuests from "./UnassignedGuests";
import TableCard from "./TableCard";
import FloorPlan from "./FloorPlan";
import TableEditorPanel from "./TableEditorPanel";
import Venue from "../Venue/Venue";

const initialTables = [
  {
    id: "table-1",
    name: "Bord 1",
    shape: "round",
    capacity: 8,
    guestIds: [],
    coordinates: { x: 600, y: 300 },
  },
  {
    id: "table-2",
    name: "Bord 2",
    shape: "rectangular",
    capacity: 8,
    guestIds: [],
    coordinates: { x: 120, y: 550 },
  },
];

function SeatingPlanner() {
  const attendingGuests = weddingService.getAttendingGuests();
  const [tables, setTables] = useState(initialTables);
  const [draggingTableId, setDraggingTableId] = useState(null);
  const nextTableNumber = (tables) => tables.length + 1;
  const activeDragRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [selectedTableId, setSelectedTableId] = useState(null);
  function startDragging(tableId, event) {
    const table = tables.find((currentTable) => currentTable.id === tableId);

    if (!table) {
      return;
    }

    const floorPlan = event.currentTarget.closest(".floor-plan__canvas");

    if (!floorPlan) {
      return;
    }

    const floorPlanRect = floorPlan.getBoundingClientRect();

    setDraggingTableId(tableId);

    setDragOffset({
      x: event.clientX - floorPlanRect.left - table.coordinates.x,
      y: event.clientY - floorPlanRect.top - table.coordinates.y,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function startDragging(tableId, event) {
    const table = tables.find((currentTable) => currentTable.id === tableId);

    if (!table) {
      return;
    }

    const floorPlan = event.currentTarget.closest(".floor-plan__canvas");

    if (!floorPlan) {
      return;
    }

    const floorPlanRect = floorPlan.getBoundingClientRect();

    activeDragRef.current = tableId;

    dragOffsetRef.current = {
      x: event.clientX - floorPlanRect.left - table.coordinates.x,
      y: event.clientY - floorPlanRect.top - table.coordinates.y,
    };

    setDraggingTableId(tableId);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function dragTable(event) {
    const activeTableId = activeDragRef.current;

    if (!activeTableId) {
      return;
    }

    const floorPlan = event.currentTarget.closest(".floor-plan__canvas");

    if (!floorPlan) {
      return;
    }

    const floorPlanRect = floorPlan.getBoundingClientRect();

    const newX = event.clientX - floorPlanRect.left - dragOffsetRef.current.x;

    const newY = event.clientY - floorPlanRect.top - dragOffsetRef.current.y;

    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === activeTableId
          ? {
              ...table,
              coordinates: {
                x: Math.max(0, newX),
                y: Math.max(0, newY),
              },
            }
          : table
      )
    );
  }

  function stopDragging(event) {
    activeDragRef.current = null;
    setDraggingTableId(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function addTable() {
    setTables((currentTables) => [
      ...currentTables,
      {
        id: crypto.randomUUID(),
        name: `Bord ${nextTableNumber(currentTables)}`,
        shape: "round",
        capacity: 8,
        guestIds: [],
        coordinates: {
          x: 80 + currentTables.length * 30,
          y: 120 + currentTables.length * 30,
        },
      },
    ]);
  }

  function updateTableName(tableId, newName) {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId ? { ...table, name: newName } : table
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
        table.id === tableId ? { ...table, name: trimmedName } : table
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

  function updateTableShape(tableId, shape) {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId ? { ...table, shape } : table
      )
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
  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? null;
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
        <UnassignedGuests
          guests={unassignedGuests}
          tables={tables}
          onAssignGuest={assignGuestToTable}
        />

        <FloorPlan>
          <Venue>
            {tables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                tables={tables}
                getGuestById={getGuestById}
                onUpdateName={updateTableName}
                onRename={renameTable}
                onUpdateCapacity={updateTableCapacity}
                onUpdateShape={updateTableShape}
                onAssignGuest={assignGuestToTable}
                onRemoveGuest={removeGuestFromTable}
                dragging={draggingTableId === table.id}
                onDragStart={startDragging}
                onDrag={dragTable}
                onDragEnd={stopDragging}
                selected={selectedTableId === table.id}
                onSelect={setSelectedTableId}
              />
            ))}
          </Venue>
        </FloorPlan>
        <TableEditorPanel
          table={selectedTable}
          onUpdateName={updateTableName}
          onRename={renameTable}
          onUpdateCapacity={updateTableCapacity}
          onUpdateShape={updateTableShape}
          onClose={() => setSelectedTableId(null)}
        />
      </div>
    </section>
  );
}

export default SeatingPlanner;
