const apiKey = 'afa8445f5d26a615485846974596b181'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityNameElem = document.getElementById('cityName');
const temperatureElem = document.getElementById('temperature');
const feelsLikeElem = document.getElementById('feelsLike');
const descriptionElem = document.getElementById('description');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const pressureElem = document.getElementById('pressure');
const sunriseElem = document.getElementById('sunrise');
const sunsetElem = document.getElementById('sunset');
const weatherIconElem = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');
const backgroundVideo = document.getElementById('backgroundVideo');

const videoBackgrounds = {
    clear: 'videos/clear-sky.mp4',
    clouds: 'videos/cloudy.mp4',
    rain: 'videos/rainy.mp4',
    thunderstorm: 'videos/storm.mp4',
    snow: 'videos/snow.mp4',
    default: 'videos/default.mp4',
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        errorMessage.classList.add('hidden');
        fetchWeather(city);
    } else {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
    }
});

async function fetchWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('City not found.');

        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

function displayWeather(data) {
    const { name, main, weather, wind, sys } = data;

    cityNameElem.textContent = `Weather in ${name}`;
    temperatureElem.textContent = `🌡️ Temperature: ${main.temp}°C`;
    feelsLikeElem.textContent = `🤔 Feels Like: ${main.feels_like}°C`;
    descriptionElem.textContent = `📖 Condition: ${weather[0].description}`;
    humidityElem.textContent = `💧 Humidity: ${main.humidity}%`;
    windElem.textContent = `🌬️ Wind Speed: ${wind.speed} m/s`;
    pressureElem.textContent = `🧭 Pressure: ${main.pressure} hPa`;
    sunriseElem.textContent = `🌅 Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}`;
    sunsetElem.textContent = `🌇 Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}`;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const weatherCondition = weather[0].main.toLowerCase();
    backgroundVideo.src = videoBackgrounds[weatherCondition] || videoBackgrounds.default;

    weatherDisplay.classList.remove('hidden');
}
