// Simple Weather App using OpenWeatherMap API
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

const apiKey = '40718d94a6aef9594a72da08a8f7020b';
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('Please enter a city name.');
    }
});

async function getWeather(city) {
    errorDisplay.textContent = '';
    weatherDisplay.innerHTML = 'Loading...';
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
    setWeatherBackground(condition);
}

function setWeatherBackground(condition) {
    // Simple background color change based on condition
    const app = document.querySelector('.weather-app');
    let bg = '#e0e7ef'; // default
    if (condition === 'Clear') bg = '#ffe066';
    else if (condition === 'Clouds') bg = '#b0bec5';
    else if (condition === 'Rain') bg = '#90caf9';
    else if (condition === 'Snow') bg = '#f0f4c3';
    else if (condition === 'Thunderstorm') bg = '#b39ddb';
    else if (condition === 'Drizzle') bg = '#a7c7e7';
    else if (condition === 'Mist' || condition === 'Fog') bg = '#cfd8dc';
    app.style.background = bg;
}

function showError(message) {
    weatherDisplay.innerHTML = '';
    errorDisplay.textContent = message;
}
