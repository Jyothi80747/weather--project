function WeatherDetails({ weather }) {
  const current = weather.current;

  const details = [
    ["Humidity", `${current.relative_humidity_2m}%`],
    ["Wind Speed", `${current.wind_speed_10m} km/h`],
    ["Precipitation", `${current.precipitation} mm`],
    ["UV Index", `${weather.daily.uv_index_max[0]}`]
  ];

  return (
    <section>
      <h2>Weather Details</h2>

      <div className="details-grid">
        {details.map(([name, value]) => (
          <div className="detail-card" key={name}>
            <h3>{name}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;