let appID = "ba701a47ffad408f7e4fdab7f10618af";
let units = "imperial";
let searchMethod = "zip";

//Trying to make sure user only inputs 5 digit zipcode; else it goes by city name if applicable
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}

function init(resultsfromServer) {
  switch (resultsfromServer.weather[0].main) {
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
      document.body.style.backgroundImage = 'url("stormy.jpeg")';
      break;

    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpeg")';
      break;

    default:
      document.body.style.backgroundImage = 'url("default.jpeg")';
      break;
  }

  let weatherHeader = document.getElementById("weatherHeader");
  let tempElement = document.getElementById("temp");
  let humidElement = document.getElementById("humidity");
  let windElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");

  weatherIcon.src =
    `http://openweathermap.org/img/w/` +
    resultsfromServer.weather[0].icon +
    `.png`;

  let mph = Math.floor(resultsfromServer.wind.speed) * 2.23694;
  let resultDescription = resultsfromServer.weather[0].description;
  //Used to only make first letter capitalized
  weatherHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  tempElement.innerHTML = Math.floor(resultsfromServer.main.temp) + "&#176";
  windElement.innerHTML = "Windspeed is " + Math.round(mph) + " mph";
  cityHeader.innerHTML = resultsfromServer.name;
  humidElement.innerHTML =
    "Humidity at " + resultsfromServer.main.humidity + "%";

  SetPositionForWeatherInfo();
}

function SetPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("search").value;
  if (searchTerm) searchWeather(searchTerm);
});
