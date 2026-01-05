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

const init = function (resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpg")';
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
  const weatherContainer = document.getElementById("weatherContainer");

  weatherIcon.src = `https://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`;
  weatherContainer.style.visibility = "visible";

  const timeZone = resultFromServer.timezone;
  setCurrentTime(timeZone);

  const resultDescript = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescript.charAt(0).toUpperCase() + resultDescript.slice(1);
  temperaterElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176" + "C"; // &#176 is the degree sign
  windSpeedElement.innerHTML =
    "Winds at: " + Math.floor(resultFromServer.wind.speed) + "m/s";
  humidityElement.innerHTML =
    "Humidity at: " + Math.floor(resultFromServer.main.humidity);
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
      init(result); // get the real data
    });
};

document
  .getElementById("searchContainer")
  .addEventListener("submit", (event) => {
    // prevent default refresh
    event.preventDefault();
    const searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) searchWeather(searchTerm);
  });
