import React from "react";

function WeatherInfo({ data }) {
  return (
    <div className="cityNameDiv p-2 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-5 items-center mb-8">
        <div className="text-center  ">
          <p className="text-4xl font-bold  ">{data.name.toUpperCase()}</p>
          <p className="text-2xl  ">{data.country}</p>
          <p className="text-sm mt-2 ">{data.localtime}</p>
        </div>
        <div className="lg:ml-20 flex">
          {/* <!-- Sunrise   --> */}
          <div className="text-center  text-sm">
            <p>Sunrise </p>
            <p>{data.sunrise}</p>
          </div>

          <div className="flex flex-col items-center b text-white  rounded-lg shadow-md p-2 ">
            <img
              title={data.current.condition}
              src={data.current.icon}
              alt={data.current.condition}
              className="w-32 h-32 object-cover"
            />
            <p className="text-lg font-semibold mt-4  ">
              {data.current.condition}
            </p>
            <p className="text-sm t ">{data.current.feelslike_c}°C</p>
          </div>
          {/* <!-- Sunset--> */}
          <div className="text-center  text-sm">
            <p>Sunset </p>
            <p>{data.sunset}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-around bg-white  bg-opacity-10 p-6 rounded-lg shadow-md">
        <div>
          <p className="font-semibold text-white">Wind Speed:</p>
          <p className="text-white">{data.current.wind_kph} km/h</p>
        </div>
        <div>
          <p className="font-semibold text-white">Wind Deg:</p>
          <p className="text-white">{data.current.wind_degree}&deg;</p>
        </div>

        <div>
          <p className="font-semibold text-white">Humidity</p>
          <p className="text-white">{data.current.humidity}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Feels Like</p>
          <p className="text-white">{data.current.feelslike_c}&deg;</p>
        </div>
        <div>
          <p className="font-semibold text-white">Current Temp</p>
          <p className="text-white">{data.current.temp_c}&deg;</p>
        </div>
        <div>
          <p className="font-semibold text-white">Ozone</p>
          <p className="text-white">{data.current.ozone}</p>
        </div>
        <div>
          <p className="font-semibold text-white">UV Index</p>
          <p className="text-white">{data.current.uv_index}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Vision</p>
          <p className="text-white">{data.current.visionInKm} km</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
