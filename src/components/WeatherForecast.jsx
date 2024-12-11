import React, { useState } from "react";

function WeatherForecast({ data }) {
  const [viewHours, setViewHours] = useState({});

  const toggleHourlyForecast = (date) => {
    setViewHours((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.forecastDay.map((day) => (
          <div
            key={day.date}
            className="bg-black opacity-75 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm p-4"
          >
            {/* Day Overview */}
            <h3 className="text-2xl font-bold mb-4 text-center text-white">
              {new Date(day.date).toDateString()}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={day.icon}
                  alt={day.condition}
                  className="w-12 h-12 rounded-lg"
                />
                <p className="ml-2 text-gray-300 font-semibold">
                  {day.condition}
                </p>
              </div>

              <div>
                <p className="text-gray-300 mb-2 italic underline underline-offset-2">
                  {" "}
                  Sunrise : {day.sunrise}{" "}
                </p>

                <p className="text-gray-300"> Vision : {day.avgvis_km} km</p>
                <p className="text-gray-300">
                  {" "}
                  Wind Speed : {day.maxwind_kph} kph
                </p>

                <p className="text-gray-300 mt-2 italic underline underline-offset-2 ">
                  {" "}
                  Sunset : {day.sunset}
                </p>
              </div>
              <div>
                <p className="font-bold text-gray-200">
                  {Math.round(day.maxtemp_c)}°C / {Math.round(day.mintemp_c)}°C
                </p>
                <p className="text-gray-300">Humidity: {day.avghumidity}%</p>
              </div>
            </div>

            {/* Toggle Button for Hourly Forecast */}
            <button
              className="bg-gray-700 text-white text-sm px-3 py-1 rounded-lg mb-4 hover:bg-gray-600"
              onClick={() => toggleHourlyForecast(day.date)}
            >
              {viewHours[day.date]
                ? "Hide Hourly Forecast"
                : "View Hourly Forecast"}
            </button>

            {/* Hourly Forecast */}
            {viewHours[day.date] && (
              <div className="mt-4 space-y-2">
                {day.hour.map((hour, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-t border-gray-200"
                  >
                    <div className="flex items-center">
                      <img
                        src={hour.icon}
                        alt={hour.condition}
                        className="w-10 h-10"
                      />
                      <p className="ml-2 text-gray-300">{hour.condition}</p>
                    </div>
                    <p className="text-gray-300">
                      {new Date(hour.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="font-bold text-gray-200">
                      {Math.round(hour.temp_c)}°C
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
