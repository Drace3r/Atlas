import { EditableList } from "../../../shared/components";

const initialFocusItems = [
  {
    id: "focus-wedding",
    title: "Fortsätt med Wedding",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "focus-fitness",
    title: "Genomför dagens träningspass",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "focus-career",
    title: "Ta ett steg i jobbsökandet",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

function TodaysFocus() {
  return (
    <section className="todays-focus">
      <div className="todays-focus__heading">
        <div>
          <p className="eyebrow">Idag</p>
          <h2>Dagens fokus</h2>
        </div>

        <span className="todays-focus__label">Daily direction</span>
      </div>

      <EditableList
        title=""
        initialItems={initialFocusItems}
        storageKey="atlas:dashboard:todays-focus:v1"
      />
    </section>
  );
}

export default TodaysFocus;
