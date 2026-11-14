function HourlyForecast({ weather, unit }) {
  const hourly = weather.hourly;

  const start = hourly.time.findIndex(
    time => time >= weather.current.time
  );

  const startIndex = Math.max(start, 0);

  const times = hourly.time.slice(
    startIndex,
    startIndex + 24
  );

  function convert(temp) {
    return Math.round(
      unit === "fahrenheit"
        ? temp * 9 / 5 + 32
        : temp
    );
  }

  return (
    <section>
      <h2>Next 24 Hours</h2>

      <div className="hourly-list">
        {times.map(time => {
          const index = hourly.time.indexOf(time);

          return (
            <div className="hour-card" key={time}>
              <p>
                {new Date(time).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: weather.timezone
                  }
                )}
              </p>

              <h3>
                {convert(hourly.temperature_2m[index])}
                {unit === "celsius" ? "°C" : "°F"}
              </h3>

              <p>
                Rain:{" "}
                {hourly.precipitation_probability[index] ?? 0}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;