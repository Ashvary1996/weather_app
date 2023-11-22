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

  const handleOnSearchChange = (searchData) => {
    // const [lat, long] = searchData.value.split(" ");
    const [name] = searchData.label.split(" ");
    console.log(name);
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${name}&aqi=yes`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${name}&aqi=yes&days=7`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };
  // console.log(currentWeather);
  // console.log(forecast);
  return (
    <div className="App   p-5">
      <h1 className="text-xl mb-2">Weather-App</h1>
      <div className="w-[50%] m-auto ">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      {!currentWeather && <DefaultDisplay />}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecastweather data={forecast} />}
    </div>
  );
}

export default App;
