import React from "react";

function LocationInfo({ data }) {
  return (
    <div className="locationDiv rounded p-5 ml-2 text-xl  ">
      <h1 className="font-semibold font-serif mb-5 ">Location Info</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-lg ">City </p>
          <p className="font-bold text-lg">{data.name}</p>
        </div>

        <div>
          <p className="font-semibold text-lg ">Country</p>
          <p className="font-bold text-lg">{data.country}</p>
        </div>
        <div>
          <p className="font-semibold text-lg ">Latitude</p>
          <p className="font-bold text-lg">{data.lat}</p>
        </div>
        <div>
          <p className="font-semibold text-lg ">Longitude</p>
          <p className="font-bold text-lg">{data.lon}</p>
        </div>
        <div>
          <p className="font-semibold text-lg ">Timezone</p>
          <p className="font-bold text-lg">{data.timeZone}</p>
        </div>
        <div>
          <p className="font-semibold text-lg ">Localtime</p>
          <p className="font-bold text-lg">{data.localtime}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;
