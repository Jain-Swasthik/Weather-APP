
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");


const api_key="b0f5ccc6bf51f0f34ad7fc2e16d3ef"



const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt, timezone) => {
  const curDate = new Date((dt + timezone) * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC", 
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(curDate);
};

citySearch.addEventListener('submit', (e) => {
  e.preventDefault(); 

  let cityInput = document.querySelector(".city_Name");
  city = cityInput.value.trim();  

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  getWeatherData();

  cityInput.value = "";
});

let city = "moodabidri";  

const getWeatherData = async () => {

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json(); 

    const { main, name, weather, wind, sys, dt, timezone } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    
    dateTime.innerHTML = getDateTime(dt, timezone);

    w_forecast.innerHTML = weather[0].main;

    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176;C`;
    
    w_minTem.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176;C`;

    w_feelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176;C`;

    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;

    w_pressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.log("Error fetching weather:", error);
    cityName.innerHTML = "City not found. Please try again."; 
  }
};

window.onload = getWeatherData;
