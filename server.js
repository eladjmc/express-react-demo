import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: './config/config.env' });

const app = express();

// Constants for API endpoint and header values
const WEATHER_API_URL = 'https://weatherapi-com.p.rapidapi.com/current.json';
const XR_API_KEY = process.env.XRAPID_API_KEY;
const XR_API_HOST = 'weatherapi-com.p.rapidapi.com';

app.get('/', (req, res) => res.send('Server running'));

app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  if (!location || location.trim() === '') {
    return res.status(400).send('Invalid or missing location parameter');
  }

  const options = {
    method: 'GET',
    url: WEATHER_API_URL,
    params: { q: location },
    headers: {
      'X-RapidAPI-Key': XR_API_KEY,
      'X-RapidAPI-Host': XR_API_HOST
    }
  };
  
  try {
    const response = await axios.request(options)
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
