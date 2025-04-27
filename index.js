<script>
document.getElementById("location-input").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.getElementById("search-button").click();
  }
});

const searchButton = document.getElementById("search-button");
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityFlag = document.querySelector('.city-flag');
const cityName = document.querySelector('.city-name');
const countryFlag = document.querySelector('.country-flag');

searchButton.addEventListener('click', async () => {
  const apiKey = 'db36b89964b3e71f2af263de5f8dc89d'; // your API key
  const location = document.getElementById('location-input').value.trim();

  if (location === '') {
    alert('Please enter a location!');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === 404 || data.cod === '404') {
      showError();
      return;
    }

    hideError();
    updateWeather(data);

  } catch (error) {
    console.error(error);
    alert('Unable to fetch weather. Check your internet connection or API Key!');
  }
});

function showError() {
  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  cityFlag.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
}

function hideError() {
  error404.style.display = 'none';
  error404.classList.remove('fadeIn');
}

function updateWeather(data) {
  const weatherIcon = document.querySelector('.weather-box img');
  const temperature = document.querySelector('.weather-box .temperature');
  const description = document.querySelector('.weather-box .description');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');
  const pressure = document.querySelector('.weather-details .pressure-details span');
  const visibility = document.querySelector('.weather-details .visibility-details span');

  cityFlag.style.display = 'flex';
  cityName.textContent = data.name + ',';
  countryFlag.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
  countryFlag.alt = data.sys.country;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].main;

  temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  description.innerHTML = data.weather[0].description;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`;
  pressure.innerHTML = `${data.main.pressure} mb`;
  visibility.innerHTML = `${(data.visibility / 1000).toFixed(1)} km`;

  weatherBox.style.display = 'block';
  weatherDetails.style.display = 'flex';
  weatherBox.classList.add('fadeIn');
  weatherDetails.classList.add('fadeIn');
  container.style.height = 'auto';
}
</script>
