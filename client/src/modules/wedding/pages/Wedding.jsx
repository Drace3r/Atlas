import "../styles/wedding.css"

import WeddingStats from "../components/WeddingStats";
import GuestTable from "../components/GuestTable";
import WeddingOverviewCards from "../components/WeddingOverviewCards";
import SeatingPlanner from "../components/SeatingPlanner/SeatingPlanner";


function Wedding() {
  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Wedding</p>
          <h1>Wedding Dashboard</h1>
          <p>Överblick över gäster och planering.</p>
        </div>
      </div>

      <WeddingOverviewCards />

<WeddingStats />

<GuestTable />

<SeatingPlanner />
    </main>
  );
}

export default Wedding;