function CurrentWeather({
  weather,
  location,
  unit,
  isFavorite,
  onFavorite
}) {
  let temp = weather.current.temperature_2m;

  if (unit === "fahrenheit") {
    temp = temp * 9 / 5 + 32;
  }

  return (
    <section className="current-card">
      <div>
        <h2>{location.name}</h2>
        <p>Current Weather</p>
      </div>

      <button onClick={onFavorite}>
        {isFavorite ? "❤️ Saved" : "🤍 Favorite"}
      </button>

      <h1>
        {Math.round(temp)}
        {unit === "celsius" ? "°C" : "°F"}
      </h1>

      <p>
        Feels like:{" "}
        {Math.round(
          unit === "fahrenheit"
            ? weather.current.apparent_temperature * 9 / 5 + 32
            : weather.current.apparent_temperature
        )}
        {unit === "celsius" ? "°C" : "°F"}
      </p>

      <p>
        Updated: {weather.current.time}
      </p>
    </section>
  );
}

export default CurrentWeather;