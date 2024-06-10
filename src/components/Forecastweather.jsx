import React from "react";

function ForecastWeather({ data }) {
  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="forecastDiv w-[70%] m-auto">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Weather Forecast</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.forecast.forecastday.map((day, i) => (
            <div key={i} className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">{forecastDays[i]}</p>
                <img
                  src={day.day.condition.icon}
                  className="w-12 h-12"
                  alt="weather"
                />
              </div>
              <p className="text-xl text-neutral-300 ">
                {day.day.condition.text}
              </p>
              <p className="text-xs text-neutral-300">{day.date}</p>
              <div className="flex justify-between mt-2">
                <p className="text-xs">
                  Min Temp: {Math.round(day.day.mintemp_c)}°C
                </p>
                <p className="text-xs">
                  Max Temp: {Math.round(day.day.maxtemp_c)}°C
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs">Visibility: {day.day.avgvis_km} km</p>
                <p className="text-xs">Humidity: {day.day.avghumidity}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs">UV Index: {day.day.uv}</p>
                <p className="text-xs">Sunrise: {day.astro.sunrise}</p>
              </div>
              <p className="text-xs">Sunset: {day.astro.sunset}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForecastWeather;
