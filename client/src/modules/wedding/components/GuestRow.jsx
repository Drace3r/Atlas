import StatusBadge from "./StatusBadge";

function GuestRow({ guest }) {
  const formattedDate = guest.respondedAt
    ? new Intl.DateTimeFormat("sv-SE", {
        day: "numeric",
        month: "short",
      }).format(new Date(guest.respondedAt))
    : "–";

  return (
    <tr>
      <td>{guest.name}</td>

      <td>
        <StatusBadge status={guest.status} />
      </td>

      <td>{guest.allergies || "–"}</td>

      <td>{formattedDate}</td>
    </tr>
  );
}

export default GuestRow;