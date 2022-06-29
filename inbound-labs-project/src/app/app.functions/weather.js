const axios = require('axios');
const { performance } = require('perf_hooks');
const OPENWEATHER_ENDPOINT_URL = 'https://api.openweathermap.org/data/2.5/find';
const { OPENWEATHER_API_KEY } = process.env;

exports.main = async (context = {}, sendResponse) => {
  const { city = 'Boston', state = 'MA', country = 'US' } = context;

  if (!city || !state || !country) {
    throw new Error('No city or state provided');
  }
  const queryString = state ? `${city}, ${state}, ${country}` : city;
  const queryUrl = `${OPENWEATHER_ENDPOINT_URL}?q=${encodeURIComponent(
    queryString
  )}&units=imperial&appid=${OPENWEATHER_API_KEY}`;

  // console.log('Weather Query URL: ', queryUrl);

  let response;
  const start = performance.now();
  response = await axios.get(queryUrl);
  console.log(`Request time: ${performance.now() - start}`);

  const { data } = response;
  const queryResponse = data.list[0];
  const {
    name,
    main: { temp, humidity, feels_like, temp_min, temp_max },
    weather,
  } = queryResponse;
  const weatherTypes = weather.map(w => w.main);

  const weatherImageSection = JSON.stringify([
    {
      "type": "markdown",
      "text": `**Weather for:** ${name}`
    },
    {
    type: 'image',
    src: getImage(weatherTypes[0]),
    alt: `Weather: ${weatherTypes[0]} day`
  },
  {
    "type": "markdown",
    "text": `**Temperature:** ${Math.round(parseInt(temp, 10))}°`
  },
  {
    "type": "markdown",
    "text": `**Feels like:** ${Math.round(parseInt(feels_like, 10))}°`
  },
  {
    "type": "markdown",
    "text": `**Humidity:** ${Math.round(parseInt(humidity, 10))}%`
  },
  {
    "type": "markdown",
    "text": `**High:** ${Math.round(parseInt(temp_max, 10))}°`
  },
  {
    "type": "markdown",
    "text": `**Low:** ${Math.round(parseInt(temp_min, 10))}°`
  },
  {
    "type": "markdown",
    "text": `**Weather types:** ${weatherTypes.join('and')}`
  }
  ]);

  sendResponse({
      sections: weatherImageSection,
  });
};

/**
 * List of weather-related images by category, sourced from unsplash.com
 */
const images = {
  rain: [
    {id: '1515694346937-94d85e41e6f0', width: 934, height: 200, crop: ''},
    {id: '1451859829053-586915480216', width: 1000, height: 250, crop: ''},
  ],
  snow: [
    {id: '1517166357932-d20495eeffd7', width: 1000, height: 250, crop: '&crop=entropy'},
    {id: '1548097160-627fd636ee56', width: 1000, height: 250, crop: ''},
    {id: '1470102008679-243edbe1039a', width: 1000, height: 250, crop: ''},
  ],
  thunderstorm: [
    {id: '1537210249814-b9a10a161ae4', width: 1000, height: 250, crop: '&crop=bottom'},
    {id: '1575256150247-4715c50bb243', width: 1000, height: 250, crop: ''},
    {id: '1613053554449-d05c76186887', width: 1000, height: 250, crop: '&crop=edges'},
  ],
  drizzle: [
    {id: '1541919329513-35f7af297129', width: 1000, height: 200, crop: ''},
    {id: '1508873760731-9c3d0bb6b961', width: 1000, height: 200, crop: ''},
    {id: '1576234699886-7eb7f11aecb7', width: 1000, height: 250, crop: ''},
  ],
  clear: [
    {id: '1485395578879-6ba080c9cdba', width: 1000, height: 300, crop: '&crop=focalpoint&fp-y=0.25&fp-z=0.8'},
    {id: '1605158080227-fd61e78bdc8b', width: 1000, height: 250, crop: '&crop=focalpoint&fp-y=0.600'},
    {id: '1595228221915-3de4e7788896', width: 1000, height: 250, crop: '&crop=top'},
    {id: '1541119638723-c51cbe2262aa', width: 1000, height: 250, crop: ''},
  ],
  clouds: [
    {id: '1613379293095-d81837c1502d', width: 800, height: 300, crop: ''},
    {id: '1517140660730-555d93ca5f60', width: 1000, height: 200, crop: '&crop=focalpoint&fp-y=0.450'},
    {id: '1596389287804-74e6128bd6d3', width: 1000, height: 250, crop: ''},
  ],
  fog: [
    {id: '1524252500348-1bb07b83f3be', width: 1000, height: 250, crop: ''},
    {id: '1479476437642-f85d89e5ad7b', width: 1000, height: 250, crop: ''},
    {id: '1569805518539-9c0757e653bf', width: 1000, height: 250, crop: '&crop=focalpoint&fp-y=0.650'},
  ],
}

function randomIndex(key) {
  return Math.round(Math.random() * 10) % images[key].length;
}

function buildImageUrl(category, index) {
  const {id, height, width, crop} = images[category][index];
  return `https://images.unsplash.com/photo-${id}?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=${width}&h=${height}${crop}`
}

function getImage(weatherType = '', randomize = true) {
  let category = weatherType.toLowerCase();
  if (!(category in images)) {
    category = 'clear';
  }

  return buildImageUrl(category, randomize ? randomIndex(category) : 0);
}
