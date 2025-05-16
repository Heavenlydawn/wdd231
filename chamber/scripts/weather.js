const apiKey = 'e7716fadbae9fffeef88a0556d4bf5bc';
  const city = 'Abuja';

  async function fetchWeather() {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    ]);

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    displayCurrentWeather(current);
    displayForecast(forecast);
  }

  function displayCurrentWeather(data) {
    const el = document.getElementById('weatherNow');
    el.innerHTML = `
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
    const el = document.getElementById('weatherForecast');
    const forecastDays = {};

    data.list.forEach(item => {
      const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
      if (!forecastDays[date]) forecastDays[date] = [];
      forecastDays[date].push(item.main.temp);
    });

    const entries = Object.entries(forecastDays).slice(0, 3);
    el.innerHTML = entries.map(([day, temps]) => {
      const avgTemp = Math.round(temps.reduce((a, b) => a + b) / temps.length);
      return `<p>${day}: <strong>${avgTemp}°F</strong></p>`;
    }).join('');
  }

  fetchWeather();