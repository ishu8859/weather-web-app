const searchButton = document.getElementById("search-button");
const locationInput = document.getElementById("location-input");
const weatherBox = document.querySelector(".weather-box");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const airPressure = document.getElementById("air-pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const apiKey = "884f61f52290617b885646ebdf2997e0";

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    getWeatherData(location);
  }
});

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { temp, feels_like } = data.main;
      const { description } = data.weather[0];
      const { humidity } = data.main;
      const { speed } = data.wind;
      const { air_pressure } = data.main;
      const { visibility } = data;
      const { sunrise, sunset } = data.sys;

      temperature.innerText = `${temp}°C`;
      description.innerText = description;
      humidity.innerText = `${humidity}%`;
      wind.innerText = `${speed} Km/h`;
      airPressure.innerText = `${air_pressure} hPa`;
      visibility.innerText = `${visibility / 1000} km`;
      sunrise.innerText = formatTime(sunrise);
      sunset.innerText = formatTime(sunset);

      weatherBox.classList.add("load");

      setTimeout(() => {
        weatherBox.classList.remove("load");
      }, 1000);
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid location. Please try again.");
    });
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2,"0");
  return `${hours}:${minutes}`;
}