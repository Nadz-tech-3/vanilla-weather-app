function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "bfa005e48f0f8e59ta753oe5e3baa0b4";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New-York&key=bfa005e48f0f8e59ta753oe5e3baa0b4`;

axios.get(apiUrl).then(displayTemperature);
