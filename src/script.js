function formatDate (timestamp){
let date = new Date (timestamp);

let dayIndex = date.getDay();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days [dayIndex];
  return ` ${day} ${formatHours(timestamp)}`;
 } 

function formatHours(timestamp){
  let date = new Date (timestamp);

let hours = date.getHours();
if (hours < 10){
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
 }

 function displayWeatherCondition(response){  
   document.querySelector("#city").innerHTML=response.data.name;
   document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
 document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatDate(response.data.dt  *1000);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
 
   let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

 celsiusTemperature = response.data.main.temp;
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
 
 function displayForecast(response){
 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML=null;
let forecast = null;
   
for  (let index = 0; index < 6; index++) {
  let forecast = response.data.list[index];
     forecastElement.innerHTML += ` 
  <div class="col-2">
    <h2>
    ${formatHours(forecast.dt  *1000)}
    </h2>
    <img 
    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    alt=""
     />
    <div class="weather-forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
           </div>
        </div>
       `;
}
}

 function searchCity(city){
  let apiKey= "c6e720f1cbcd8f1e302c88b67fb9a8fa"; 
 let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get (apiUrl) .then(displayWeatherCondition);

apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&&appid=${apiKey}&units=metric`;
axios.get (apiUrl).then (displayForecast);



  }

 function handleSubmit (event) {
   event. preventDefault ( );
   let city=document.querySelector("#city-input").value;
  searchCity(city);
   
 }
function searchLocation(position){  
  let apiKey= "c6e720f1cbcd8f1e302c88b67fb9a8fa"; 
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
  position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault ();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

 function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
 let fahrenheitTemperature=  (celsiusTemperature * 9) / 5 + 32;
 temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date ();
dateElement.innerHTML= formatDate (currentTime);


let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);




let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Berlin");