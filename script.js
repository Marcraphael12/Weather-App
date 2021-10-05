const api = {
  key: '2b466fc6c97ed733df38f026005db547',
  base: 'https://api.openweathermap.org/data/2.5/weather?',
};

const input = document.querySelector('#input');
input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    getWeather(input.value);

    /*-------------------FUNCTION TO DISPLAY DATE AND TIME USING MOMENT.JS-------------------*/
    const { DateTime } = luxon;
    const now = DateTime.now();
    document.querySelector('#date').innerHTML = `<i class="far fa-calendar-alt"> Date:</i>  <div class="values">${now.toLocaleString(DateTime.DATETIME_MED)}</div>`;
    document.querySelector('.main-weather').style.display = 'block';
  }
});

function getWeather(city) {
  fetch(`${api.base}q=${city}&appid=${api.key}&units=metric`)
    .then((details) => {
      return details.json();
    })
    .then(showWeather);
}

function showWeather(details) {
  // Taking the received values from API into this function

  // console.log(details);
  let city = document.getElementById('city');
  city.innerHTML = `<i class="fas fa-search-location"> Place:</i> <div class="values">${details.name}, ${details.sys.country}</div>`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `<i class="fas fa-thermometer"> Temperature:</i> <div class="values">${Math.round(details.main.temp)}°C</div>`;

  let minMax = document.getElementById('min-max');
  minMax.innerHTML = `<div class="values">${Math.round(
    details.main.temp_min
  )}°C (Min) and ${Math.round(details.main.temp_max)}°C (Max)</div>`;

  let weather = details.weather[0].main;

  let body = document.querySelector('body');

  if (weather === 'Rain') {
    body.classList.add('rain');
    body.classList.remove('cloud', 'sun', 'thunder');
  } else if (weather === 'Clouds') {
    body.classList.add('cloud');
    body.classList.remove('rain', 'sun', 'thunder');
  } else if (weather === 'Clear') {
    body.classList.add('sun');
    body.classList.remove('rain', 'cloud', 'thunder');
  } else if (weather === 'Thunderstorm') {
    body.classList.add('thunder');
    body.classList.remove('rain', 'sun', 'cloud');
  }

  let weatherType = document.getElementById('weather-type');
  weatherType.innerHTML = `<i class="fas fa-cloud"> Weather Type:</i><div class="values">${weather}</div>`;

  document.querySelector('.main-weather').style.display = 'flex';
}
