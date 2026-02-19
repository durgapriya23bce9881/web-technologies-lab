const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const conditionEl = document.getElementById("condition");

const API_KEY = "API_KEY_REMOVED_FOR_SECURITY";

let lastCachedResult = null;  // caching variable

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showMessage("Please enter a city name", "error");
    return;
  }

  // If same city searched again, use cache
  if (lastCachedResult && lastCachedResult.city.toLowerCase() === city.toLowerCase()) {
    displayWeather(lastCachedResult.data);
    showMessage("Loaded from cache", "success");
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  showLoading(true);
  showMessage("");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found");
      } else {
        throw new Error("Server error");
      }
    }

    const data = await response.json();

    // Cache result
    lastCachedResult = {
      city: city,
      data: data
    };

    displayWeather(data);

  } catch (error) {
    weatherCard.classList.add("hidden");
    showMessage(error.message, "error");
  } finally {
    showLoading(false);
  }
}

function displayWeather(data) {
  cityNameEl.textContent = data.name;
  tempEl.textContent = data.main.temp;
  humidityEl.textContent = data.main.humidity;
  conditionEl.textContent = data.weather[0].description;

  weatherCard.classList.remove("hidden");
}

function showLoading(show) {
  loading.classList.toggle("hidden", !show);
}

function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}
