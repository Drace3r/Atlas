import WeddingStats from "../components/wedding/WeddingStats";
import GuestTable from "../components/wedding/GuestTable";

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

      <WeddingStats />
      <GuestTable/>
    </main>
  );
}

export default Wedding;