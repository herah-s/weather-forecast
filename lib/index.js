// TODO: Call the Weather API when the form is submitted
const openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
const geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?';
const key = '11746a4b05e6de4ff628f74c72e65f7f';

const form = document.querySelector('form');
const input = document.getElementById('input');
const city = document.getElementById('city');
const date = document.getElementById('date');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const temperature = document.getElementById('temperature');
const currentLocation = document.getElementById('currentLocation');

// TODO: Create a function to get the weather info
// TODO: Replace the following line with the correct url
// TODO: Insert the weather info in the DOM (description, date, temperature...)

const fetchWeather = (lat, lon) => {
  const url = `${openWeatherAPI}lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  fetch(url).then(response => response.json()).then((data) => {
    console.log(data);
    city.innerText = data.name;
    date.innerText = (new Date((data.dt + data.timezone) * 1000).toUTCString()).replace(" GMT", "");
    description.innerText = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    temperature.innerText = `${Math.floor(data.main.temp)}°C`;
  });
  input.value = '';
};

// TODO: Add an event listener to the form
// TODO: prevent default behavior of the form
// TODO: On submit, in the callback, call the fetchWeather function

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputCity = input.value;
  const geoUrl = `${geocodingAPI}q=${inputCity}&limit=1&appid=${key}`;
  fetch(geoUrl).then(response => response.json()).then((data) => {
    console.log(data);
    const lat = data[0].lat;
    const lon = data[0].lon;
    fetchWeather(lat, lon);
  });
});

navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
  const currentLat = data.coords.latitude;
  const currentLon = data.coords.longitude;
  currentLocation.addEventListener('click', (event) => {
    event.preventDefault();
    fetchWeather(currentLat, currentLon);
  });
});

// Short but hacky:
// const date = (new Date((data.dt + data.timezone) * 1000).toUTCString()).replace(" GMT", "")

// Longer, slightly more proper:
// const formatDate = (timezone) => {
//   const today = new Date();
//   const localOffset = timezone + today.getTimezoneOffset() * 60;
//   const localDate = new Date(today.setUTCSeconds(localOffset));
//   const options = {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//   };
//   const formattedDate = localDate.toLocaleDateString("en-US", options);
//   return formattedDate;
// };
