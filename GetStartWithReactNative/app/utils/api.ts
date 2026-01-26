const API_KEY = '81ebfdb6cf230f54228561cdffa91ed3';

const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const ONE_CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

/**
 * 1️⃣ Convert city name → lat & lon
 */
export const fetchCoordinates = async (city: string) => {
  const response = await fetch(
    `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );

  if (!response.ok) {
    console.log( await response.json())
    console.log('Failed to fetch coordinates');
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error('City not found');
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
    country: data[0].country,
  };
};

/**
 * 2️⃣ Fetch weather via One Call 3.0
 */
export const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `${ONE_CALL_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }

  const data = await response.json();

  const current = data.current;

  return {
    temperature: current.temp,
    weather: current.weather[0].main,
    description: current.weather[0].description,
    icon: current.weather[0].icon,
  };
};
