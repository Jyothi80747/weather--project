
import { useEffect, useState } from "react";
import {
  searchCity,
  getWeather
} from "./services/weatherApi";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import WeatherChart from "./components/WeatherChart";
import Favorites from "./components/Favorites";

import "./App.css";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [city, setCity] = useState("Hyderabad");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [unit, setUnit] = useState("celsius");
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [favorites, setFavorites] = useState(
    () => readStorage("favorites", [])
  );

  const [recent, setRecent] = useState(
    () => readStorage("recentCities", [])
  );

  async function loadCity(cityName) {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const cities = await searchCity(cityName);

      if (!cities.length) {
        throw new Error("City not found");
      }

      const selectedCity = cities[0];

      const data = await getWeather(
        selectedCity.latitude,
        selectedCity.longitude
      );

      setLocation(selectedCity);
      setCity(selectedCity.name);
      setWeather(data);

      setRecent(previous => [
        selectedCity.name,
        ...previous.filter(
          item => item !== selectedCity.name
        )
      ].slice(0, 5));

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCity("Hyderabad");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "recentCities",
      JSON.stringify(recent)
    );
  }, [recent]);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  function toggleFavorite() {
    if (!location) return;

    const exists = favorites.some(
      item => item.name === location.name
    );

    if (exists) {
      setFavorites(previous =>
        previous.filter(
          item => item.name !== location.name
        )
      );
    } else {
      setFavorites(previous => [
        ...previous,
        {
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude
        }
      ]);
    }
  }

  async function loadFavorite(item) {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await getWeather(
        item.latitude,
        item.longitude
      );

      setLocation(item);
      setCity(item.name);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        setLoading(true);
        setError("");

        try {
          const data = await getWeather(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(data);
          setLocation({
            name: "My Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setCity("My Location");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Please allow location access")
    );
  }

  const isFavorite = location && favorites.some(
    item => item.name === location.name
  );

  return (
    <main className={dark ? "app dark" : "app"}>
      <Header
        dark={dark}
        setDark={setDark}
        unit={unit}
        setUnit={setUnit}
      />

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={loadCity}
        onLocation={getMyLocation}
      />

      {recent.length > 0 && (
        <p className="recent">
          Recent: {recent.join(" • ")}
        </p>
      )}

      {loading && <p>Loading weather...</p>}

      {error && <p className="error">{error}</p>}

      {weather && location && (
        <>
          <CurrentWeather
            weather={weather}
            location={location}
            unit={unit}
            isFavorite={isFavorite}
            onFavorite={toggleFavorite}
          />

          <WeatherDetails
            weather={weather}
          />

          <HourlyForecast
            weather={weather}
            unit={unit}
          />

          <WeatherChart
            weather={weather}
            unit={unit}
          />

          <WeeklyForecast
            weather={weather}
            unit={unit}
          />
        </>
      )}

      <Favorites
        favorites={favorites}
        onSelect={loadFavorite}
      />
    </main>
  );
}

export default App;


