import "./App.css";
import React, { useEffect, useState } from "react";
import dotenv from "react-dotenv";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  const fetchData = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${dotenv.API_KEY}&q=London&aqi=yes`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => { }, [fetchData]);

  return (
    <div className="App  h-[100vh] border-red-700 border-2 ">
      {/* <button onClick={fetchData} >Get Data</button> */}
      {data.length !== 0 ? (
        null
      ) : <>
        <div className="fullApp border border-red-950 flex flex-row h-[100vh]">

          {/* /////////////////// Left Div ////////////////// */}
          <div className="leftDiv bg-gray-600 border  bg-transparent  w-[60%] ">



            <div className="showText flex flex-wrap p-5 gap-4 border relative top-[70%]    ml-11 font-bold ">
              <p className="text-6xl">20&deg;</p>
              <div>
                <p className="text-4xl w-[100%]">London</p>
                <p className="text-sm ">06.09- Monday, 9Sep'19 </p>
              </div>
              <div>
                <p className="  text-3xl w-[100%]">O</p>
                <p className="text-sm"></p> Cloudy
              </div>

            </div>
          </div>

          {/* ............................. Right DIV ................................. */}
          <div className="rightDiv border bg-gray-800  bg-opacity-50 backdrop-opacity-50  text-white w-[40%]" >


            <div className="flex">
              <input className="border pl-3 text-black" type="text" placeholder="search location" />
              <button className="border"> Search</button>

            </div>
            <div className="text-sm text-left pl-5 mt-2">
              <p>Chhindwara</p>
              <p>Bhopal</p>
              <p>Jabalpur</p>
              <p>Indore</p>
            </div>
            <hr className="border mt-5" />
            <div className="">
              <p>Weather Details</p>
              <br />
              <div className="flex flex-col  border pl-5 pr-5">
                <div className="flex justify-between" > <p>Cloudy</p><p>86%</p></div>
                <div className="flex justify-between"> <p>Humidity</p><p>62%</p></div>
                <div className="flex justify-between"> <p>Wind</p><p></p>8km/h</div>

              </div>


            </div>




          </div>
        </div>

      </>}
    </div >
  );
}

export default App;
