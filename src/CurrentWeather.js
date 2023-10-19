import React, { useState } from "react";
import dotenv from "react-dotenv";
import axios from "axios";
import $ from "jquery";

function CurrentWeather() {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [search, setSearch] = useState([]);
  const [lastSearch, setLastSearch] = useState([]);

  const fetchData = async () => {
    await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${dotenv.API_KEY}&q=${search}&days=7&aqi=yes&alerts=yes`
      )
      .then((res) => {
        setData(res.data);
        setForecast(data.forecast.forecastday);
        setLastSearch([...lastSearch, search]);
      })
      .catch((err) => console.log(err));
  };

  const forecastDiv = () => {
    console.log("Clicked on forcast");
    $(".forecastText").text("Hide Forecast");
    $(".showForecast").fadeToggle();
  };
  const getValue = (e) => {
    console.log("Clicked on  ", e.target.value);
  };
  // console.log(search);
  // console.log("data", data);
  // console.log("forecast", forecast);
  return (
    <>
      {data == null ? (
        <>
          <h1>Welcome to Weather App </h1>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button onClick={fetchData}>Search</button>
        </>
      ) : (
        <>
          <div className="  flex flex-row  h-[100vh] relative">
            {/* ///////////////////     Left Div      ////////////////// */}

            <div className="leftDiv  border-green-700 border-2 absolute bottom-[10%] bg-transparent w-[60%] ">
              <div className="flex flex-wrap   gap-4  first-line:   ml-16    font-bold  w-fit">
                <p className="text-6xl">{data.current.temp_c}&deg;</p>
                <div>
                  <p className="text-4xl w-[100%] text-left">
                    {data.location.name}
                  </p>
                  <p className="text-sm ">{data.location.localtime}</p>
                </div>
                <div>
                  <p className="  text-3xl w-[100%]">
                    <img src={data.current.condition.icon} alt="" />{" "}
                  </p>
                  <p className="text-sm"></p>
                  {data.current.condition.text}
                </div>
              </div>

              <div
                className={`${forecast.length !== 0 ? "visible" : "hidden"}`}
              >
                <p
                  className="forecastText text-right pr-4 cursor-pointer"
                  onClick={forecastDiv}
                >
                  See Forecast
                </p>

                <div className={"showForecast hidden"}>
                  <h1>{forecast.length} Days Forecast</h1>

                  <div className="flex flex-row justify-around ">
                    {forecast.map((day, i) => (
                      <div
                        key={i}
                        className="border border-red-500 backdrop-blur-sm p-3 text-black font-bold"
                      >
                        <p>
                          <img src={day.day.condition.icon} alt="" />
                        </p>
                        <p>{day.date}</p>
                        <p>{day.day.condition.text}</p>
                        <p>{day.day.avgtemp_c}</p>
                        <p>{day.day.avghumidity}</p>
                        <p>{day.day.sunrise}</p>
                        <p>{day.day.sunset}</p>
                        <p>{day.day.avgvis_km}</p>
                        <p>{day.day.maxwind_kph}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* .....................    Right DIV        ..................... */}

            <div className="RightDiv h-[100vh] p-10 border-yellow-700 border-2  absolute right-1  bg-gray-800  bg-opacity-50  text-white w-[40%]">
              <div className="flex">
                <input
                  className="border pl-3 text-black"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="search location"
                />
                <button className="border" onClick={fetchData}>
                  Search
                </button>
              </div>

              {/* Render this Div conditinally */}
              <div className="text-sm text-left pl-5 mt-2">
                {lastSearch && lastSearch.length <= 4 ? (
                  <>
                    {lastSearch.map((city, i) => (
                      <p
                        key={i}
                        id={i + 1 + "city"}
                        className="cursor-pointer"
                        // value={city}
                        onClick={(e) => {
                          console.log(e.target.innerText);
                          setSearch(e.target.innerText);
                          // fetchData();
                        }}
                      >
                        {city}
                      </p>
                    ))}
                  </>
                ) : (
                  setLastSearch([])
                )}
              </div>

              <div></div>

              <hr className="border mt-5" />

              <div className="">
                <p>Weather Location Details</p>
                <br />
                <div className="flex flex-col  border pl-5 pr-5">
                  <div className="flex justify-between">
                    <p>City</p>
                    <p>{data.location.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Region</p>
                    <p>{data.location.region}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Country</p>
                    <p>{data.location.country}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Timezone</p>
                    <p>{data.location.tz_id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Lat/Lon</p>
                    <p>{data.location.lat + " / " + data.location.lon}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Local Time</p>
                    <p>{data.location.localtime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Temperature{}</p>
                    <p>{data.current.temp_c}&deg; C</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Wind</p>
                    <p>{data.current.wind_kph}km/h</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Humidity</p>
                    <p>{data.current.humidity} </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Visibility</p>
                    <p>{data.current.vis_km}km </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CurrentWeather;
