



// Select DOM elements where the weather data will be displayed
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
// Function to get the country name from the country code using Intl.DisplayNames API
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// Function to format and return the current date and time based on the UTC timestamp and timezone offset
const getDateTime = (dt, timezone) => {
  // Convert the UTC timestamp to a Date object adjusted by the timezone offset
  const curDate = new Date((dt + timezone) * 1000);

  // Date format options to display day, month, year, and time
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC", // Specify UTC explicitly to ensure consistent behavior across environments
  };

  // Create a formatter to apply the above options
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Return the formatted date string
  return formatter.format(curDate);
};

// Event listener for the city search form submission
citySearch.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent the form from reloading the page

  // Get the value of the city input field
  let cityInput = document.querySelector(".city_Name");
  city = cityInput.value.trim();  // Trim any extra spaces around the input value

  // Check if the city input is empty
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Fetch weather data for the city entered by the user
  getWeatherData();

  // Clear the input field after submitting
  cityInput.value = "";
});

// Default city if no city is entered
let city = "moodabidri";  

// Function to fetch weather data from OpenWeather API
const getWeatherData = async () => {
  // API endpoint with city name and API key
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    // Fetch data from the weather API
    const response = await fetch(weatherUrl);
    const data = await response.json();  // Convert the response to JSON format

    // Destructure the necessary data from the API response
    const { main, name, weather, wind, sys, dt, timezone } = data;

    // Display the city name and country
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    
    // Display the date and time adjusted by the timezone
    dateTime.innerHTML = getDateTime(dt, timezone);

    // Display the weather condition (e.g., clear, cloudy)
    w_forecast.innerHTML = weather[0].main;

    // Display the weather icon from OpenWeather (using the icon code)
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    // Convert temperature from Kelvin to Celsius and display it
    w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176;C`;
    
    // Display the minimum and maximum temperatures
    w_minTem.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176;C`;

    // Display the feels-like temperature
    w_feelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176;C`;

    // Display humidity and wind speed
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;

    // Display atmospheric pressure
    w_pressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    // Handle errors if the API request fails
    console.log("Error fetching weather:", error);
    cityName.innerHTML = "City not found. Please try again.";  // Show error message
  }
};

// Run weather data fetch when the page loads with default city
window.onload = getWeatherData;
