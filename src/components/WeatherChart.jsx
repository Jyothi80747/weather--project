import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function WeatherChart({ weather, unit }) {
  const hourly = weather.hourly;

  const start = Math.max(
    hourly.time.findIndex(
      time => time >= weather.current.time
    ),
    0
  );

  const chartData = hourly.time
    .slice(start, start + 12)
    .map((time, index) => {
      const originalIndex = start + index;

      const raw = hourly.temperature_2m[originalIndex];

      return {
        time: new Date(time).toLocaleTimeString(
          "en-IN",
          { hour: "numeric", timeZone: weather.timezone }
        ),
        temperature: Math.round(
          unit === "fahrenheit" ? raw * 9 / 5 + 32 : raw
        )
      };
    });

  return (
    <section className="chart-card">
      <h2>Temperature Trend</h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default WeatherChart;