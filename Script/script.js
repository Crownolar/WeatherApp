const API_KEY = "c44d5d221c52ea5afa140a38ee07b12c";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city) {
  weatherInfo.style.display = "none";
  errorMessage.style.display = "none";
  loader.style.display = "block";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError("City not found! Please check the spelling and try again.");
  } finally {
    loader.style.display = "none";
  }
}

function displayWeather(data) {
  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("feelsLike").textContent = `${Math.round(
    data.main.feels_like
  )}°C`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;

  const iconCode = data.weather[0].icon;
  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  weatherInfo.style.display = "block";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError("Please enter a city name");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
