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
  	document.querySelector('#date').textContent = now.toLocaleString(DateTime.DATETIME_MED);
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
  city.innerHTML = `${details.name}, ${details.sys.country}`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(details.main.temp)}°C`;

  let minMax = document.getElementById('min-max');
  minMax.innerHTML = `${Math.round(
    details.main.temp_min
  )}°C (Min) and ${Math.round(details.main.temp_max)}°C (Max) `;

  let weatherType = document.getElementById('weather-type');
  weatherType.innerHTML = `${details.weather[0].main}`;
}
