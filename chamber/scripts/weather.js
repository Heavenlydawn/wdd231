const apiKey = 'e7716fadbae9fffeef88a0556d4bf5bc';
const city = 'Abuja';

const weatherNowEl = document.getElementById('weatherNow');
const weatherForecastEl = document.getElementById('weatherForecast');

async function fetchWeather() {
  try {
    // Fetch current weather and forecast in parallel
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    ]);

    // Check for successful responses
    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse JSON data
    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    // Display data
    displayCurrentWeather(current);
    displayForecast(forecast);
  } catch (error) {
    console.error('Fetch error:', error);
    weatherNowEl.innerHTML = '<p>Error fetching weather data.</p>';
    weatherForecastEl.innerHTML = '';
  }
}

function displayCurrentWeather(data) {
  weatherNowEl.innerHTML = `
    <p><strong>${Math.round(data.main.temp)}°F</strong></p>
    <p>${data.weather[0].description}</p>
    <p>High: ${Math.round(data.main.temp_max)}°</p>
    <p>Low: ${Math.round(data.main.temp_min)}°</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
  `;
}

function displayForecast(data) {
  const forecastDays = {};

  // Aggregate temps for each day
  data.list.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    if (!forecastDays[date]) forecastDays[date] = [];
    forecastDays[date].push(item.main.temp);
  });

  // Take the next 3 days
  const entries = Object.entries(forecastDays).slice(0, 3);
  weatherForecastEl.innerHTML = entries.map(([day, temps]) => {
    const avgTemp = Math.round(temps.reduce((a, b) => a + b) / temps.length);
    return `<p>${day}: <strong>${avgTemp}°F</strong></p>`;
  }).join('');
}

// Initiate fetch on load
fetchWeather();