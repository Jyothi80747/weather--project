
const GEO_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast";

export async function searchCity(city) {
  const url = new URL(GEO_URL);

  url.search = new URLSearchParams({
    name: city,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to search for city");
  }

  const data = await response.json();

  return data.results || [];
}

export async function getWeather(latitude, longitude, signal) {
  const url = new URL(WEATHER_URL);

  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    hourly:
      "temperature_2m,precipitation_probability,weather_code,relative_humidity_2m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return await response.json();
}
