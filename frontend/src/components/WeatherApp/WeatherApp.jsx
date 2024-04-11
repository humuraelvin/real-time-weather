
import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const WeatherApp = () => {
  const api_key = "0e62d65bfc693d1f7ec0c2fe8c8c08b3";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];
    if (!element || element.value === "") {
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const humidityElement =
        document.getElementsByClassName("humidity-percent")[0];
      const windElement = document.getElementsByClassName("wind-rate")[0];
      const temperatureElement = document.getElementById("weather-temp");
      const locationElement =
        document.getElementsByClassName("weather-location")[0];
      if (
        humidityElement &&
        windElement &&
        temperatureElement &&
        locationElement
      ) {
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = Math.floor(data.wind.speed) + "m/s";
        temperatureElement.innerHTML = Math.floor(data.main.temp) + "°C";
        locationElement.innerHTML = data.name;
      }

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search for a city ..."
        />
        <div className="search-icon">
          <img src={search_icon} alt="" onClick={search} />
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="Weather Icon" />
      </div>
      <div className="weather-temp" id="weather-temp">
        24°C
      </div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
