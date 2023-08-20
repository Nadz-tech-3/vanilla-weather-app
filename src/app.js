function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `   
     <div class="col-2">
     <div class="weather-forecast-date">${day}</div>
     <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"  width="42" />
     <div class="weather-forecast-temperatures">
      <span class = "weather-forecast-temperature-max"> 18° </span>
       <span class = "weather-forecast-temperature-min"> 12° </span>
      </div>
    </div>
  `;
});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }

  
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  


celsiusTemperature = response.data.temperature.current

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "bfa005e48f0f8e59ta753oe5e3baa0b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=bfa005e48f0f8e59ta753oe5e3baa0b4`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function diplayFahrenheitTemperature(event) 
{event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function diplaycelsiusTemperature(event) 
{event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusTemperature = null;

  

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", diplayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", diplaycelsiusTemperature);

displayForecast();

