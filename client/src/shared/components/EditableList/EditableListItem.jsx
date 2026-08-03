import { useState } from "react";

function EditableListItem({ item, onToggle, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.title);

  function handleSave() {
    onSave(item.id, text);
    setEditing(false);
  }

  return (
    <li className="editable-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span>{item.title}</span>
      )}

      {editing ? (
        <>
          <button onClick={handleSave}>💾</button>
          <button onClick={() => setEditing(false)}>❌</button>
        </>
      ) : (
        <>
          <button onClick={() => setEditing(true)}>✏️</button>
          <button onClick={() => onDelete(item.id)}>🗑️</button>
        </>
      )}
    </li>
  );
}

export default EditableListItem;