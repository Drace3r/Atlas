import { useEffect, useState } from "react";

import Card from "../../../shared/components/Card/Card";
import weddingService from "../services/weddingService";
import GuestRow from "./GuestRow";

function GuestTable() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    async function loadGuests() {
      try {
        const weddingGuests = await weddingService.getGuests();

        console.log("Gäster från Wedding:", weddingGuests);

        setGuests(weddingGuests);
      } catch (error) {
        console.error(
          "Kunde inte hämta Wedding-gäster:",
          error
        );
      }
    }

    loadGuests();
  }, []);

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