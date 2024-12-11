import React from "react";

function WeatherInfo({ data }) {
  return (
    <div className="cityNameDiv p-2 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-5 items-center mb-8">
        <div className="text-center  ">
          <p className="text-4xl font-bold  ">{data.name.toUpperCase()}</p>
          <p className="text-2xl  ">{data.country}</p>
          <p className="text-sm  ">{data.localtime}</p>
        </div>

        <div className="flex flex-col items-center b text-white      rounded-lg shadow-md p-2 lg:ml-20">
          <img
            title={data.currentWeather.condition}
            src={data.currentWeather.icon}
            alt={data.currentWeather.condition}
            className="w-32 h-32 object-cover"
          />
          <p className="text-lg font-semibold mt-4  ">
            {data.currentWeather.condition}
          </p>
          <p className="text-sm t ">{data.currentWeather.feelslike_c}°C</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-between bg-gray-200 p-6 rounded-lg shadow-md">
        <div>
          <p className="font-semibold text-black">Wind Speed:</p>
          <p className="text-gray-600">{data.currentWeather.wind_kph} km/h</p>
        </div>
        <div>
          <p className="font-semibold text-black">Wind Deg:</p>
          <p className="text-gray-600">
            {data.currentWeather.wind_degree}&deg;
          </p>
        </div>

        <div>
          <p className="font-semibold text-black">Humidity:</p>
          <p className="text-gray-600">{data.currentWeather.humidity}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Feels Like:</p>
          <p className="text-gray-600">
            {data.currentWeather.feelslike_c}&deg;
          </p>
        </div>
        <div>
          <p className="font-semibold text-black">Current Temp:</p>
          <p className="text-gray-600">{data.currentWeather.temp_c}&deg;</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
