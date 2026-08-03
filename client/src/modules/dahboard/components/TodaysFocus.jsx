import { EditableList } from "../../../shared/components";

const initialFocusItems = [
  {
    id: crypto.randomUUID(),
    title: "Fortsätt med Wedding",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Genomför dagens träningspass",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Ta ett steg i jobbsökandet",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

function TodaysFocus() {
  return (
    <EditableList
      title="Dagens fokus"
      initialItems={initialFocusItems}
    />
  );
}

export default TodaysFocus;