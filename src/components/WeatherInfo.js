import React, { useEffect } from 'react'
import { useGlobalContext } from '../app/store';

function WeatherInfo() {
  const { state, refreshData } = useGlobalContext();
  let {
    weather,
    timestamp,
    status,
    error
  } = state;
  const city = weather.city ? weather.city : <>&nbsp;</>;
  const description = weather.description ? weather.description : <>&nbsp;</>;
  const date = new Date(timestamp).toDateString();
  error = error ? error : <>&nbsp;</>;

  // Re-use weather icon to show loading
  let weatherIcon;
  if (status === 'loading') {
    weatherIcon = 'images/loading_2x.png';
  } else {
    weatherIcon = `images/${weather.icon}_2x.png`;
  }

  useEffect(() => {
    if (status === 'idle' && weather.city === '') {
      // Detect city and get its weather
      refreshData('');
    }
  }, []);

  return (
    <div className='text-center'>
      <h3>{city}</h3>
      <p>{date}</p>
      <p><img alt='weather icon' src={weatherIcon} /></p>
      <p>{description}</p>
      <p>Temperature: {weather.temperature}&#8451;</p>
      <p>Wind Speed: {weather.windSpeed}km/hr</p>
      <p className='has-error'>{error}</p>
    </div>
  );
}

export default WeatherInfo;