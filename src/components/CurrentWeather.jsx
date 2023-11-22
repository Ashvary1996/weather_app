import React from "react";

function CurrentWeather({ data }) {
  // console.log("currenctwearther+>", data);
  return (
    <div className="cityAndLoacationDiv flex  mb-4 mt-4     relative  ">
      <div className=" cityNameDiv  pr-4   bg-transparent  ">
        <div className="flex flex-wrap   gap-4  first-line:   ml-16    font-bold  w-fit">
          <p className="text-6xl">{data.current.temp_c}&deg;</p>
          <div>
            <p className="text-4xl w-[100%] text-left">{data.location.name}</p>
            <p className="text-sm ">{data.location.localtime}</p>
          </div>
          <div>
            <p className="  text-3xl w-[100%]">
              <img src={data.current.condition.icon} alt="" />
            </p>
            <p className="text-sm"> {data.current.condition.text} </p>
          </div>
        </div>
      </div>
      {/* /////////////////////////// */}
      <div className="locationDiv   rounded p-5  ml-2 absolute right-3 text-xl mt-5 mr-2 ">
        <h1 className="">Location Info</h1>
        <div className="ldiv text-left">
          <p>Name : {data.location.name}</p>
          <p>Region : {data.location.region}</p>
          <p>Country : {data.location.country}</p>
          <p>Latitude : {data.location.lat}</p>
          <p>Longitude : {data.location.lon}</p>
          <p>Timezone : {data.location.tz_id}</p>
          <p>Localtime : {data.location.localtime}</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
