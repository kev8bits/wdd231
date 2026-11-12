const API_KEY = '78b6ca6d467396fb07d9a5789bea60f2';
const LAT = -31.6333;
const LON = -60.7000;
const UNITS = 'metric'; //metric for C, imperial for F

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

export async function initWeather() {
    const currentContainer = document.querySelector('#current-weather');
    const forecastContainer = document.querySelector('#weather-forecast');

    if (!currentContainer || !forecastContainer) return;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(CURRENT_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error('Failed to fetch OpenWeatherMap data');
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        renderCurrentWeather(currentData, currentContainer);
        renderForecast(forecastData, forecastContainer);
    } catch (error) {
        console.error('Weather error:', error);
        currentContainer.innerHTML = '<p>Weather data temporarily unavailable.</p>';
        forecastContainer.innerHTML = '<p>Forecast temporarily unavailable.</p>';
    }
}

function renderCurrentWeather(data, container) {
    const temp = Math.round(data.main.temp);
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    container.innerHTML = `
        <img src="${iconUrl}" alt="${desc}" width="68" height="68">
        <div>
            <p class="weather-temp">${temp}&deg;C</p>
            <p class="weather-desc">${desc}</p>
            <p class="weather-meta">High: ${high}&deg; &bull; Low: ${low}&deg;</p>
            <p class="weather-meta">Humidity: ${humidity}%</p>
        </div>
    `;
}

function renderForecast(data, container) {
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyMap = new Map();

    // Group 3-hour entries by future dates and pick midday (12:00:00) or first available reading
    for (const entry of data.list) {
        const [datePart, timePart] = entry.dt_txt.split(' ');
        if (datePart === todayStr) continue;

        if (!dailyMap.has(datePart) || timePart === '12:00:00') {
            dailyMap.set(datePart, entry);
        }
    }

    const nextThreeDays = Array.from(dailyMap.entries()).slice(0, 3);

    container.innerHTML = nextThreeDays
        .map(([dateStr, entry]) => {
            const dateObj = new Date(`${dateStr}T12:00:00`);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const temp = Math.round(entry.main.temp);
            return `
                <div class="forecast-row">
                    <span class="forecast-day">${dayName}</span>
                    <span><strong>${temp}&deg;C</strong></span>
                </div>
            `;
        })
        .join('');
}