import { useEffect, useRef, useState } from "react";
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
    coordinates: {
      x: 600,
      y: 300,
    },
  },
  {
    id: "table-2",
    name: "Bord 2",
    shape: "rectangular",
    capacity: 8,
    guestIds: [],
    coordinates: {
      x: 120,
      y: 550,
    },
  },
];

function SeatingPlanner() {
  const [attendingGuests, setAttendingGuests] = useState([]);

  const [tables, setTables] = useState(initialTables);

  const [draggingTableId, setDraggingTableId] = useState(null);

  const [selectedTableId, setSelectedTableId] = useState(null);

  const [hasLoadedSeatingPlan, setHasLoadedSeatingPlan] = useState(false);

  const activeDragRef = useRef(null);

  const dragOffsetRef = useRef({
    x: 0,
    y: 0,
  });

  /* =======================================
     LOAD GUESTS
  ======================================= */

  useEffect(() => {
    async function loadGuests() {
      try {
        const guests = await weddingService.getAttendingGuests();

        setAttendingGuests(guests);
      } catch (error) {
        console.error("Kunde inte hämta gäster till bordsplaceringen:", error);
      }
    }

    loadGuests();
  }, []);

  /* =======================================
     LOAD SAVED SEATING PLAN
  ======================================= */

  useEffect(() => {
    async function loadSeatingPlan() {
      try {
        const seatingPlan = await weddingService.getSeatingPlan();

        if (
          Array.isArray(seatingPlan.tables) &&
          seatingPlan.tables.length > 0
        ) {
          setTables(seatingPlan.tables);
        }
      } catch (error) {
        console.error("Kunde inte hämta bordsplaceringen:", error);
      } finally {
        setHasLoadedSeatingPlan(true);
      }
    }

    loadSeatingPlan();
  }, []);

  /* =======================================
     AUTO-SAVE SEATING PLAN
  ======================================= */

  useEffect(() => {
    if (!hasLoadedSeatingPlan) {
      return;
    }

    const saveTimer = window.setTimeout(async () => {
      try {
        await weddingService.saveSeatingPlan(tables);
      } catch (error) {
        console.error("Kunde inte spara bordsplaceringen:", error);
      }
    }, 500);

    return () => {
      window.clearTimeout(saveTimer);
    };
  }, [tables, hasLoadedSeatingPlan]);

  function nextTableNumber(currentTables) {
    return currentTables.length + 1;
  }

  /* =======================================
     DRAG TABLE
  ======================================= */

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

  /* =======================================
     TABLE ACTIONS
  ======================================= */

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

  function deleteTable(tableId) {
    const tableToDelete = tables.find((table) => table.id === tableId);

    if (!tableToDelete) {
      return;
    }

    const placedGuestCount = tableToDelete.guestIds.length;

    const warning =
      placedGuestCount > 0
        ? `${placedGuestCount} placerade gäster flyttas tillbaka till ej placerade.`
        : "Bordet är tomt.";

    const shouldDelete = window.confirm(
      `Vill du ta bort ${tableToDelete.name}?\n\n${warning}`
    );

    if (!shouldDelete) {
      return;
    }

    setTables((currentTables) =>
      currentTables.filter((table) => table.id !== tableId)
    );

    setSelectedTableId(null);
  }

  function updateTableName(tableId, newName) {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              name: newName,
            }
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
          ? {
              ...table,
              name: trimmedName,
            }
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

  function updateTableShape(tableId, shape) {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              shape,
            }
          : table
      )
    );
  }

  /* =======================================
     GUEST ASSIGNMENT
  ======================================= */

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

  /* =======================================
     DERIVED DATA
  ======================================= */

  const assignedGuestIds = tables.flatMap((table) => table.guestIds);

  const unassignedGuests = attendingGuests.filter(
    (guest) => !assignedGuestIds.includes(guest.id)
  );

  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? null;

  /* =======================================
     RENDER
  ======================================= */

  return (
    <section className="section seating-planner">
      <div className="section-header">
        <div>
          <p className="eyebrow">BORDSPLACERING</p>

          <h2>Placera gäster</h2>

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
          onDelete={deleteTable}
          onClose={() => setSelectedTableId(null)}
        />
      </div>
    </section>
  );
}

export default SeatingPlanner;
