//url https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//apiKey = "44dee8fdad0cf6ddbdceca7d7e935c31";
//url2 https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


//Selecting the DOM elements
const form = document.querySelector(".weatherForm");
const cityName = document.querySelector(".weatherForm-input");
const apiKey = "44dee8fdad0cf6ddbdceca7d7e935c31";
const card = document.querySelector(".weather-content-main");


/**
* Function to get user location and get weather data
*  @param {object} position object returned by geolocation API
*/
async function gotLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    if (!response.ok) {
      console.error("falied to fetch weather data");
    }

    const data = await response.json();
    displayWeatherInfo(data);
  } catch (error) {
    console.error(error);
  }
}

/**
* Function to handle failed geolocation
*/
function failed() {
  alert("user access denied. please proceed to enter a city manually");
}

/**
* Event listener to get user's location on page load
*/
document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotLocation, failed);
  } else {
    alert("Geolocation is not supported by this browser");
  }
});

/**
* Evert listener to fetch weather data based on user input city
*/
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityName.value;

  if (city) {
    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      const response = await fetch(apiURL);

      if (!response.ok) {
        console.error("error occured while fetching data");
      }
      const data = await response.json();
      console.log(data);
      displayWeatherInfo(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    throw new Error("please enter a city");
  }
});

/**
* Function to display weather data on DOM
* @param {object} data - The weather data object from the weather API
*/
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    sys: { country, sunrise, sunset },
    timezone,
    weather: [{ description, id, icon }],
    wind: { speed },
  } = data;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();

  // Clear previous weather info
  card.textContent = "";

  // Create and append weather info elements
  const day = document.createElement("p");
  const date = document.createElement("p");
  const cityDisplay = document.createElement("p");

  const tempDisplay = document.createElement("p");
  const descWeather = document.createElement("p");
  const windSpeedDsiplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");

  day.textContent = days[today.getDay()];
  date.textContent = `${today.getDate()} ${
    monthNames[today.getMonth()]
  } ${today.getFullYear()}`;
  cityDisplay.textContent = `${city}, ${country}`;

  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
  descWeather.textContent = `Weather: ${description}`;
  windSpeedDsiplay.textContent = `Wind: ${speed}km/h`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;

  // Adding style classes to weather info elements
  day.classList.add("weather-content-main");
  date.classList.add("weather-content-main");
  cityDisplay.classList.add("weather-content-main");

  tempDisplay.classList.add("weather-content-sub");
  descWeather.classList.add("weather-content-sub");
  windSpeedDsiplay.classList.add("weather-content-sub");
  humidityDisplay.classList.add("weather-content-sub");

  // Appending weaher info elements
  card.appendChild(day);
  card.appendChild(date);
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(descWeather);

  card.appendChild(windSpeedDsiplay);
  card.appendChild(humidityDisplay);

  // Display sunrise and sunset times
  showSunrise(sunrise, timezone);
  showSunset(sunset, timezone);
}

/**
* Function to show sunrise time based on geo location
* @param {number} - The sunrise timestamp in seconds
* @param {number} - Local time zone offset in seconds
*/
function showSunrise(sunrise, timezone) {
  const sunriseTimeStamp = sunrise * 1000; //The sunrise timestamp in miliseconds
  const timeZoneOffset = timezone * 1000; //Time zone offset in miliseconds

  let date = new Date(sunriseTimeStamp + timeZoneOffset);

  let hours = date.getUTCHours().toString().padStart(2, 0);
  let minutes = date.getUTCMinutes().toString().padStart(2, 0);
  let seconds = date.getUTCSeconds().toString().padStart(2, 0);

  let formattedTime = `Sunrise: ${hours}:${minutes}:${seconds}`;

  const sunriseDisplay = document.createElement("p");
  sunriseDisplay.textContent = formattedTime;
  sunriseDisplay.classList.add("weather-content-main");

  return card.appendChild(sunriseDisplay);
}

/**
* Function to show the sunset time based on geo location
* @param{number} - The sunset timestamp in seconds
* @param{number} - The local timezone offset in seconds
 */
function showSunset(sunset, timezone) {
  const sunsetTimeStamp = sunset * 1000; //The sunset timestamp in miliseconds
  const timeZoneOffset = timezone * 1000; // Time zone offset in miliseconds

  let date = new Date(sunsetTimeStamp + timeZoneOffset);

  let hours = date.getUTCHours().toString().padStart(2, 0);
  let minutes = date.getUTCMinutes().toString().padStart(2, 0);
  let seconds = date.getUTCSeconds().toString().padStart(2, 0);

  let formattedTime = `Sunset: ${hours}:${minutes}:${seconds}`;

  const sunsetDisplay = document.createElement("p");
  sunsetDisplay.textContent = formattedTime;
  sunsetDisplay.classList.add("weather-content-main");

  return card.appendChild(sunsetDisplay);
}
