import React from "react";

function Forecastweather({ data }) {
  // console.log("forecastWeather=>>>", data);
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
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className=" forecastDiv    w-[70%]">
      <h1>Weather-Forecast</h1>
      <div className=" forecastDayDiv flex   justify-around m-auto ">
        {data.forecast.forecastday.map((day, i) => (
          <div key={i} className="flex-col border w-fit pr-3 pl-3 mt-2 rounded  ">
            <img
              src={day.day.condition.icon}
              className=" m-auto "
              alt="weather"
            />
            <p className="day">{forecastDays[i]}</p>
            <p className="description">{day.day.condition.text}</p>
            <p className="day">{day.date}</p>
            <p className="min-max">
              {Math.round(day.day.mintemp_c)}°C /{" "}
              {Math.round(day.day.maxtemp_c)}
              °C
            </p>
            <p>Vision: {day.day.avgvis_km} km</p>
            <p>Humidity: {day.day.avghumidity}</p>
            <p>UV: {day.day.uv}</p>
            <p>Sunrise: {day.astro.sunrise} </p>
            <p>Sunset: {day.astro.sunset} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Forecastweather;
