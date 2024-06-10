import "./App.css";
import React, { useState } from "react";
import Search from "./components/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import DefaultDisplay from "./components/DefaultDisplay";
import Forecastweather from "./components/Forecastweather";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const cityName = searchData.label.split(",")[0];
    try {
      const [currentWeatherResponse, forecastWeatherResponse] =
        await Promise.all([
          fetch(
            `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${cityName}&aqi=yes`
          ),
          fetch(
            `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&aqi=yes&days=7`
          ),
        ]);

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastWeatherResponse.json();

      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="font-semibold mb-2">Weather-App</h1>
      <div className="searchContainer ">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      {!currentWeather && <DefaultDisplay />}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecastweather data={forecast} />}
    </div>
  );
}

export default App;
