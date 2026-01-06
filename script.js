const appId = "";
const units = "metric"; // for temperature in Celsius
let searchMethod;

const getSearchMethod = function (searchTerm) {
  // this regex finds if the input value is a 5-digit number (zipcode)
  /^\d{5}$/.test(searchTerm) ? (searchMethod = "zip") : (searchMethod = "q");
};

const setCurrentTime = function (timeZone) {
  const currentOffset = timeZone;
  const utcTimestamp = Date.now();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const targetTimestamp = utcTimestamp + currentOffset * 1000;
  const targetDate = new Date(targetTimestamp);
  const month = months[targetDate.getUTCMonth()];
  const day = targetDate.getUTCDate();
  const weekDay = days[targetDate.getUTCDay()];
  const hours = String(targetDate.getUTCHours());
  const minutes = String(targetDate.getUTCMinutes());

  const timeElement = document.getElementById("currentTime");
  timeElement.innerHTML = `${weekDay}, ${month} ${day}, ${hours}:${minutes}`;
};

const getForecastWeather = function (searchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`
  )
    .then((response) => {
      return response.json(); // get a response from request, and parse it to .json
    })
    .then((result) => {
      setForecastWeather(result);
    });
};

const setForecastWeather = function (data) {
  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = ""; // empty this container

  const dailyData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  dailyData.forEach((item) => {
    // transfer to weekday
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    // create entries
    const forecastItem = document.createElement("div");
    forecastItem.className = "forecastItem";

    forecastItem.innerHTML = `
        <div class="forecastDate">${dayName}</div>
        <img class="forecast-img" src="https://openweathermap.org/img/wn/${
          item.weather[0].icon
        }.png" alt="">
        <div class="forecastTemp">${Math.round(item.main.temp)}&#176C</div>
    `;
    forecastContainer.appendChild(forecastItem);
  });
};

const setCurrentWeather = function (resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("images/clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
      break;
    case "Mist":
      document.body.style.backgroundImage = 'url("images/mist.jpg")';
      break;
    case "Drizzle":
    case "Rain":
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("images/rain.jpg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("images/snow.jpg")';
      break;
    default:
      break;
  }

  const weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  const temperaterElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("windSpeed");
  const cityHeader = document.getElementById("cityHeader");
  const weatherIcon = document.getElementById("documentIconImg");

  document.querySelectorAll(".glass-panel").forEach((panel) => {
    panel.style.visibility = "visible";
  });

  weatherIcon.src = `https://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}.png`;

  const timeZone = resultFromServer.timezone;
  setCurrentTime(timeZone);

  const resultDescript = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescript.charAt(0).toUpperCase() + resultDescript.slice(1);
  temperaterElement.innerHTML =
    Math.round(resultFromServer.main.temp) + "&#176" + "C"; // &#176 is the degree sign
  windSpeedElement.innerHTML =
    "Wind: " + Math.floor(resultFromServer.wind.speed) + "m/s";
  humidityElement.innerHTML =
    "Humidity: " + Math.floor(resultFromServer.main.humidity) + "%";
  cityHeader.innerHTML = resultFromServer.name;
};

const searchWeather = function (searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`
  )
    .then((response) => {
      return response.json(); // get a response from request, and parse it to .json
    })
    .then((result) => {
      setCurrentWeather(result); // get the real data and call this method to show current weather info
    });
};

document
  .getElementById("searchContainer")
  .addEventListener("submit", (event) => {
    // prevent default refresh
    event.preventDefault();
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (searchTerm) {
      searchWeather(searchTerm);
      getForecastWeather(searchTerm);
    }
  });
