import React from "react";

function WeatherForecast({ data }) {
 
  const groupByDay = (forecast) => {
    return forecast.reduce((acc, current) => {
      const date = current.date_txt.split(" ")[0]; // Extract the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current);
      return acc;
    }, {});
  };

  const groupedForecasts = groupByDay(data.forecast);

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedForecasts).map(([date, forecasts]) => (
          <div
            key={date}
            className="bg-black opacity-70 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm p-4"
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-white">
              {new Date(date).toDateString()}
            </h3>

            {forecasts.map((forecast, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-t border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${forecast.weatherIcon}.png`}
                    alt={forecast.weatherDescription}
                    className="w-12 h-12 rounded-lg"
                  />
                  <p className="ml-2 text-gray-300 font-semibold">
                    {forecast.weatherMain}
                  </p>
                </div>

                <p className="text-gray-300">
                  {new Date(forecast.date_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="font-bold text-gray-200">
                  {Math.round(forecast.temp_min)}°C /{" "}
                  {Math.round(forecast.temp_max)}°C
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
