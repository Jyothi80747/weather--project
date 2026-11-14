function Header({ dark, setDark, unit, setUnit }) {
  return (
    <header className="header">
      <h1>Weather Dashboard</h1>

      <div className="header-actions">
        <button onClick={() => setUnit(
          unit === "celsius" ? "fahrenheit" : "celsius"
        )}>
          {unit === "celsius" ? "°C" : "°F"}
        </button>

        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;