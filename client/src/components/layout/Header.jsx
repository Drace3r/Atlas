import { useApp } from "../../context/AppContext";

function Header() {
  const { settings } = useApp();

  return (
    <header className="page-header">
     <div>
    <p className="eyebrow">ATLAS</p>
    <h2>Välkommen tillbaka, {settings.user.name}! 👋</h2>
    <p>Din personliga kontrollcentral.</p>
</div>

      <button className="profile-button" type="button">
        {settings.user.initials}
      </button>
    </header>
  );
}

export default Header;