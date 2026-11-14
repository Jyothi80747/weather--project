function WeeklyForecast({ weather, unit }) {
  const daily = weather.daily;

  function convert(temp) {
    return Math.round(
      unit === "fahrenheit"
        ? temp * 9 / 5 + 32
        : temp
    );
  }

  return (
    <section>
      <h2>7-Day Forecast</h2>

      <div className="weekly-list">
        {daily.time.map((day, index) => (
          <div className="day-card" key={day}>
            <h3>
              {new Date(day + "T12:00:00").toLocaleDateString(
                "en-IN",
                { weekday: "long" }
              )}
            </h3>

            <p>
              High: {convert(daily.temperature_2m_max[index])}°
            </p>

            <p>
              Low: {convert(daily.temperature_2m_min[index])}°
            </p>

            <p>
              UV: {daily.uv_index_max[index]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeeklyForecast;