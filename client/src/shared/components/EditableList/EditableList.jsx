import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import EditableListItem from "./EditableListItem";

function loadSavedItems(storageKey, initialItems) {
  if (!storageKey) {
    return initialItems;
  }

  try {
    const savedItems = localStorage.getItem(storageKey);

    if (!savedItems) {
      return initialItems;
    }

    const parsedItems = JSON.parse(savedItems);

    return Array.isArray(parsedItems) ? parsedItems : initialItems;
  } catch (error) {
    console.error("Kunde inte läsa sparad lista:", error);

    return initialItems;
  }
}

function EditableList({ title, initialItems = [], storageKey }) {
  const [items, setItems] = useState(() =>
    loadSavedItems(storageKey, initialItems)
  );

  const [newItemTitle, setNewItemTitle] = useState("");

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Kunde inte spara listan:", error);
    }
  }, [items, storageKey]);

  function toggleItem(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

  function deleteItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function saveItem(id, title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              title: trimmedTitle,
            }
          : item
      )
    );
  }

  function addItem(event) {
    event.preventDefault();

    const trimmedTitle = newItemTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems((currentItems) => [...currentItems, newItem]);

    setNewItemTitle("");
  }

  const completedCount = items.filter((item) => item.completed).length;

  const progressPercentage =
    items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <section className="editable-list">
      {title && (
        <div className="editable-list__header">
          <div>
            <p className="eyebrow">Idag</p>

            <h2>{title}</h2>
          </div>
        </div>
      )}

      <div className="editable-list__progress">
        <div className="editable-list__progress-text">
          <span>Din utveckling idag</span>

          <strong>
            {completedCount}/{items.length} klara
          </strong>
        </div>

        <div className="editable-list__progress-track">
          <div
            className="editable-list__progress-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      <ul className="editable-list__items">
        {items.map((item) => (
          <EditableListItem
            key={item.id}
            item={item}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onSave={saveItem}
          />
        ))}
      </ul>

      <form className="editable-list__form" onSubmit={addItem}>
        <input
          type="text"
          value={newItemTitle}
          onChange={(event) => setNewItemTitle(event.target.value)}
          placeholder="Lägg till en uppgift..."
          aria-label="Ny uppgift"
        />

        <button type="submit">
          <Plus size={18} strokeWidth={2} />

          <span>Lägg till</span>
        </button>
      </form>
    </section>
  );
}

export default EditableList;
