import React from "react";

function CurrentWeather({ data }) {
  return (
    <div className="cityAndLocationDiv flex flex-wrap mb-4 mt-4 relative">
      <div className="cityNameDiv pr-4 bg-transparent">
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-6xl">{data.current.temp_c}&deg;</p>
          <div>
            <p className="text-4xl">{data.location.name}</p>
            <p className="text-sm">{data.location.localtime}</p>
          </div>
          <div>
            <img src={data.current.condition.icon} alt="" />
            <p className="text-sm">{data.current.condition.text}</p>
          </div>
        </div>
      </div>
      <div className="locationDiv rounded p-5 ml-2 text-xl">
        <h1 className="font-semibold font-serif mb-2">Location Info</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{data.location.name}</p>
          </div>
          <div>
            <p className="font-semibold">Region:</p>
            <p>{data.location.region}</p>
          </div>
          <div>
            <p className="font-semibold">Country:</p>
            <p>{data.location.country}</p>
          </div>
          <div>
            <p className="font-semibold">Latitude:</p>
            <p>{data.location.lat}</p>
          </div>
          <div>
            <p className="font-semibold">Longitude:</p>
            <p>{data.location.lon}</p>
          </div>
          <div>
            <p className="font-semibold">Timezone:</p>
            <p>{data.location.tz_id}</p>
          </div>
          <div>
            <p className="font-semibold">Localtime:</p>
            <p>{data.location.localtime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
