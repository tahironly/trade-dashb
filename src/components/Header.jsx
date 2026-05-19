export default function Header({ navItems }) {
  return (
    <header className="topbar">
      <div className="brand">لوحة متابعة حركة البضائع</div>

      <nav className="nav" aria-label="Main dashboard navigation">
        {navItems.map((item, index) => (
          <button key={item} className={index === 0 ? 'active' : ''} type="button">
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}
