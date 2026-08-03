import Card from "../../../shared/components/Card/Card";
import weddingService from "../services/weddingService";
import GuestRow from "./GuestRow";

function GuestTable() {
  const guests = weddingService.getGuests();

  return (
    <Card as="section" className="guest-table-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">RSVP</p>
          <h2>Gästlista</h2>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="guest-table">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Status</th>
              <th>Allergier</th>
              <th>Svarat</th>
            </tr>
          </thead>

          <tbody>
  {guests.map((guest) => (
    <GuestRow
      key={guest.id}
      guest={guest}
    />
  ))}
</tbody>
        </table>
      </div>
    </Card>
  );
}

export default GuestTable;