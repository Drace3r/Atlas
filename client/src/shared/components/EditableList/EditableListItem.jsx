import { Check, Pencil, Save, Trash2, X } from "lucide-react";

import { useState } from "react";

function EditableListItem({ item, onToggle, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);

  const [text, setText] = useState(item.title);

  function handleSave() {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onSave(item.id, trimmedText);
    setEditing(false);
  }

  function cancelEditing() {
    setText(item.title);
    setEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSave();
    }

    if (event.key === "Escape") {
      cancelEditing();
    }
  }

  return (
    <li
      className={
        item.completed
          ? "editable-list-item editable-list-item--completed"
          : "editable-list-item"
      }
    >
      <button
        type="button"
        className="editable-list-item__check"
        onClick={() => onToggle(item.id)}
        aria-pressed={item.completed}
        aria-label={
          item.completed
            ? `Markera ${item.title} som ej klar`
            : `Markera ${item.title} som klar`
        }
      >
        {item.completed && <Check size={15} strokeWidth={3} />}
      </button>

      <div className="editable-list-item__content">
        {editing ? (
          <input
            className="editable-list-item__input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Redigera uppgift"
            autoFocus
          />
        ) : (
          <span>{item.title}</span>
        )}
      </div>

      <div className="editable-list-item__actions">
        {editing ? (
          <>
            <button
              type="button"
              className="editable-list-item__action editable-list-item__action--save"
              onClick={handleSave}
              aria-label="Spara ändring"
            >
              <Save size={17} strokeWidth={1.9} />
            </button>

            <button
              type="button"
              className="editable-list-item__action"
              onClick={cancelEditing}
              aria-label="Avbryt redigering"
            >
              <X size={17} strokeWidth={1.9} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="editable-list-item__action"
              onClick={() => setEditing(true)}
              aria-label={`Redigera ${item.title}`}
            >
              <Pencil size={17} strokeWidth={1.9} />
            </button>

            <button
              type="button"
              className="editable-list-item__action editable-list-item__action--delete"
              onClick={() => onDelete(item.id)}
              aria-label={`Ta bort ${item.title}`}
            >
              <Trash2 size={17} strokeWidth={1.9} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default EditableListItem;
