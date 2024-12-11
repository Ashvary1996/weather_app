import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import LocationInfo from "./components/Locationinfo";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  
  // console.log(data);

  const fetchWeatherData = useCallback(
    async (lat = null, lon = null) => {
      // console.log(input, lat, lon);
      try {
        const weatherApiQuery = lat && lon ? `${lat},${lon}` : input;
        const openWeatherQuery =
          lat && lon ? `lat=${lat}&lon=${lon}` : `q=${input}`;

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY_CITY}&q=${weatherApiQuery}&aqi=yes`
        );

        const responseforForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?${openWeatherQuery}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY_FORECAST}`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const resData = await response.json();
        const resData2 = await responseforForecast.json();
        const { location, current } = resData;
        const { city, list } = resData2;

        const transformedCityData = {
          name: location.name,
          region: location.region,
          lat: location.lat,
          lon: location.lon,
          country: location.country,
          timeZone: location.tz_id,
          localtime: location.localtime,
          currentWeather: {
            temp_c: current.temp_c,
            temp_f: current.temp_f,
            condition: current.condition.text,
            icon: current.condition.icon,
            wind_mph: current.wind_mph,
            wind_kph: current.wind_kph,
            wind_degree: current.wind_degree,
            pressure_mb: current.pressure_mb,
            humidity: current.humidity,
            feelslike_c: current.feelslike_c,
            cloud: current.cloud,
            dewpoint_c: current.dewpoint_c,
            gust_mph: current.gust_mph,
            uv_index: current.uv,
          },
          cityId: city.id,
          population: city.population,

          forecast: list.map((entry) => ({
            date: entry.dt,
            date_txt: entry.dt_txt,
            weatherDescription: entry.weather[0]?.description || "",
            weatherIcon: entry.weather[0]?.icon || "",
            weatherId: entry.weather[0]?.id || "",
            weatherMain: entry.weather[0]?.main || "",
            windDeg: entry.wind.deg,
            windGust: entry.wind.gust,
            windSpeed: entry.wind.speed + " m/s",
            clouds: entry.clouds.all + " %",
            feels_like: entry.main.feels_like,
            grnd_level: entry.main.grnd_level || null,
            humidity: entry.main.humidity,
            pressure: entry.main.pressure,
            sea_level: entry.main.sea_level || null,
            temp: entry.main.temp,
            temp_kf: entry.main.temp_kf || null,
            temp_max: entry.main.temp_max,
            temp_min: entry.main.temp_min,
            visibility: entry.visibility + " m",
          })),
        };

        setData(transformedCityData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(
          "City not found or invalid data! Try: city, country (e.g.= Delhi,India)."
        );
      }
    },
    [input]
  );

  ///////////////////

  useEffect(() => {
    const geoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    geoLocation();
  }, [fetchWeatherData]);
  ///////////////////////////////////////////////////////////////////
  return (
    <div className="App p-2  min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-orange-600">Weather App</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeatherData();
          }}
        >
          <div className="mt-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for city"
              className=" text-center text-black font-semibold border   p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-300 mr-4"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200 mt-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Main Content */}
      <div>
        {!data ? (
          <>
            <p className="text-center text-lg text-gray-200 w-3/4 mx-auto mb-6">
              No data available. Please search for a city or enable location
              access.
            </p>
            <div className="flex justify-center  m-auto">
              <img
                src="https://media2.giphy.com/media/l5JbspfwZ0yjHjlJ0K/giphy.gif"
                alt="Loading..."
                className="w-3/4 sm:w-1/2 rounded-full shadow-lg"
              />
            </div>
          </>
        ) : (
          <div className="p-2 mainDiv">
            <div className="flex flex-wrap justify-around items-start    mx-auto  rounded-lg shadow-lg ">
              <div className="weatherInfo     md:w-[65%] w-full">
                <WeatherInfo data={data} />
              </div>

              <div className="locationinfo   md:w-[35%] w-full ">
                <LocationInfo data={data} />
              </div>
            </div>

            {/* Forecast Section */}
            <div className="forecastDiv  border border-gray-300 rounded-lg   mt-2 shadow-sm">
              <h2
                title="hourly forecaste"
                className="font-bold text-white text-3xl  mb-4 mt-2 "
              >
                Forecast Weather
              </h2>
              <WeatherForecast data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
