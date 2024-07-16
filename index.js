//url https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//apiKey = "44dee8fdad0cf6ddbdceca7d7e935c31";

const form = document.querySelector(".weatherForm");
const cityName = document.querySelector(".weatherForm-input");
const apiKey = "44dee8fdad0cf6ddbdceca7d7e935c31";
const card = document.querySelector(".weather-content-main");

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

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    sys: { country, sunrise, sunset },
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

  card.textContent = "";
  const day = document.createElement("p");
  const date = document.createElement("p");
  const cityDisplay = document.createElement("p");

  const weatherIcon = document.querySelector(".weatherIcon");

  const tempDisplay = document.createElement("p");
  const descWeather = document.createElement("p");
  const windSpeedDsiplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");

  day.textContent = days[today.getDay()];
  date.textContent = `${today.getDate()} ${
    monthNames[today.getMonth()]
  } ${today.getFullYear()}`;
  cityDisplay.textContent = `${city}, ${country}`;

  const weatherIconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//  weatherIcon.src = weatherIconURL;
//  weatherIcon.classList.add("weather-content-main");
//  weatherIcon.style.display = "block";

  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
  descWeather.textContent = `${(description).charAt(0).toUpperCase() + (description).slice(1).toLowerCase()}`
  windSpeedDsiplay.textContent = `Wind: ${speed}km/h`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;

  day.classList.add("weather-content-main");
  date.classList.add("weather-content-main");
  cityDisplay.classList.add("weather-content-main");


  tempDisplay.classList.add("weather-content-sub");
  descWeather.classList.add("weather-content-sub");
  windSpeedDsiplay.classList.add("weather-content-sub");
  humidityDisplay.classList.add("weather-content-sub");

  card.appendChild(day);
  card.appendChild(date);
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(descWeather);

  card.appendChild(windSpeedDsiplay);
  card.appendChild(humidityDisplay);
  showSunrise(sunrise);
  showSunset(sunset);
}

function showSunrise(sunrise) {
  const sunriseTimeStamp = sunrise;
  const sunriseDate = new Date(sunriseTimeStamp * 1000);
  const formatTime = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const formatedSunrise = formatTime(sunriseDate);
  const sunriseDisplay = document.createElement("p");
  sunriseDisplay.textContent = formatedSunrise;
  sunriseDisplay.classList.add("weather-content-sub");
  return card.appendChild(sunriseDisplay);
}

function showSunset(sunset) {
  const sunsetTimeStamp = sunset;
  const sunsetDate = new Date(sunsetTimeStamp * 1000);
  const formatTime = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const formatedSunset = formatTime(sunsetDate);
  const sunsetDisplay = document.createElement("p");
  sunsetDisplay.textContent = formatedSunset;
  sunsetDisplay.classList.add("weather-content-sub");
  return card.appendChild(sunsetDisplay);
}

function person() {
    const name = "muneeb";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
console.log(person())