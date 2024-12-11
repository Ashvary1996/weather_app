import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import LocationInfo from "./components/Locationinfo";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  const fetchWeatherData = useCallback(
    async (lat = null, lon = null) => {
      try {
        const query = lat && lon ? `${lat},${lon}` : input;

        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${query}&days=10&aqi=yes`
        );
        if (response.ok === false) {
          throw new Error("City not found");
        }
        const resData = await response.json();
        // console.log("response", response);

        const { location, current, forecast } = resData;

        const customData = {
          name: location?.name || "Unknown Location",
          region: location?.region || "Unknown Region",
          country: location?.country || "Unknown Country",
          lat: location?.lat || 0,
          lon: location?.lon || 0,
          timeZone: location?.tz_id || "Unknown Time Zone",
          localtime: location?.localtime || "Unknown Time",
          current: {
            last_updated: current?.last_updated || "Unknown",
            temp_c: current?.temp_c || 0,
            temp_f: current?.temp_f || 0,
            condition: current?.condition?.text || "Unknown Condition",
            icon: current?.condition?.icon || "",
            wind_kph: current?.wind_kph || 0,
            wind_degree: current?.wind_degree || 0,
            humidity: current?.humidity || 0,
            cloud: current?.cloud || 0,
            feelslike_c: current?.feelslike_c || 0,
            heatindex_c: current?.heatindex_c || 0,
            visionInKm: current?.vis_km || 0,
            uv_index: current?.uv || 0,
            ozone: current?.air_quality?.o3 || 0,
          },
          sunrise:
            forecast?.forecastday?.[0]?.astro?.sunrise || "Unknown Sunrise",
          sunset: forecast?.forecastday?.[0]?.astro?.sunset || "Unknown Sunset",
          forecastDay:
            forecast?.forecastday?.map((day) => ({
              date: day?.date || "Unknown Date",
              sunrise: day?.astro?.sunrise || "Unknown Sunrise",
              sunset: day?.astro?.sunset || "Unknown Sunset",
              maxtemp_c: day?.day?.maxtemp_c || 0,
              mintemp_c: day?.day?.mintemp_c || 0,
              avgtemp_c: day?.day?.avgtemp_c || 0,
              maxwind_kph: day?.day?.maxwind_kph || 0,
              avgvis_km: day?.day?.avgvis_km || 0,
              totalsnow_cm: day?.day?.totalsnow_cm || 0,
              avghumidity: day?.day?.avghumidity || 0,
              condition: day?.day?.condition?.text || "Unknown Condition",
              icon: day?.day?.condition?.icon || "",
              hour:
                day?.hour?.map((elem) => ({
                  time: elem?.time || "Unknown Time",
                  temp_c: elem?.temp_c || 0,
                  wind_kph: elem?.wind_kph || 0,
                  wind_degree: elem?.wind_degree || 0,
                  wind_dir: elem?.wind_dir || "Unknown Direction",
                  vis_km: elem?.vis_km || 0,
                  snow_cm: elem?.snow_cm || 0,
                  humidity: elem?.humidity || 0,
                  cloud: elem?.cloud || 0,
                  condition: elem?.condition?.text || "Unknown Condition",
                  icon: elem?.condition?.icon || "",
                })) || [],
            })) || [],
        };

        setData(customData);
      } catch (error) {
        console.log("Error fetching weather data:", error);
        alert(
          "City not found or invalid data! Try: City Name, Country Name (e.g.= Delhi,India)."
        );
      }
    },
    [input]
  );

  ///////////////////

  useEffect(() => {
    if (input === "") {
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
    }
  }, [input, fetchWeatherData]);
  ///////////////////////////////////////////////////////////////////
  return (
    <div className="App p-2  min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className=" mt-3 text-5xl font-bold text-center  shadow-lg transition-transform hover:scale-105 w-fit m-auto text-yellow-500">
          Weather App
        </h3>
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
              className=" text-center text-black font-semibold border p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-300 mr-4"
            />
            <button
              disabled={!input}
              type="submit"
              className={`bg-orange-500 hover:bg-orange-600 text-white px-6  py-3 rounded-lg font-semibold shadow-md transition duration-200 mt-2 ${
                !input ? "cursor-not-allowed" : null
              }`}
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
            <p className="text-center text-lg text-gray-200 w-3/4 mx-auto mb-6 italic  ">
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
          <div className="p-2 mainDiv border border-gray-300 rounded-lg">
            <div className="flex flex-wrap justify-around items-start    mx-auto  rounded-lg shadow-lg ">
              <div className="weatherInfo     md:w-[65%] w-full">
                <WeatherInfo data={data} />
              </div>

              <div className="locationinfo   md:w-[35%] w-full ">
                <LocationInfo data={data} />
              </div>
            </div>

            {/* Forecast Section */}
            <div className="forecastDiv     mt-2 shadow-sm">
              <h2
                title="hourly forecaste"
                className="font-bold text-white text-3xl  mb-4 mt-2 "
              >
                Weather Forecast
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
