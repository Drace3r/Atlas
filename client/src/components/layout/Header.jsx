import { useApp } from "../../context/AppContext";

function Header() {
  const { settings } = useApp();

  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h2>Hej {settings.user.name}! 👋</h2>
        <p>Här är en överblick över din vardag.</p>
      </div>

      <button className="profile-button" type="button">
        {settings.user.initials}
      </button>
    </header>
  );
}

export default Header;