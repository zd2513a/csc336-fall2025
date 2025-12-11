import { useState, useEffect } from "react";

const API_KEY = "ddbee85734a10b9b3730150ac120ae42";

function WeatherPage() {
  const [city, setCity] = useState("Washington,US");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  async function fetchWeather(targetCity) {
    try {
      setError("");

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        targetCity
      )}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log("Weather API data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      setWeather({
        name: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city);
  }

  return (
    <div className="app">
      <h1 className="app-title">Current Weather</h1>

      <form className="input-row" onSubmit={handleSearch}>
        <input
          className="item-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City,CountryCode  (e.g. Washington,US)"
        />
        <button className="add-button" type="submit">
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <p style={{ fontSize: "20px" }}>
            {weather.name}: <strong>{weather.temp} °C</strong>
          </p>
          <p>Condition: {weather.desc}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;