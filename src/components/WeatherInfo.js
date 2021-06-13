import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { refreshData } from '../app/store';

function WeatherInfo() {
  const dispatch = useDispatch();

  const weather = useSelector(state => state.weather);
  const timestamp = useSelector(state => state.timestamp);
  const city = weather.city ? weather.city : <>&nbsp;</>;
  const description = weather.description ? weather.description : <>&nbsp;</>;
  const date = new Date(timestamp).toDateString();
  const status = useSelector(state => state.status);
  const error = useSelector(state => state.error) || <>&nbsp;</>;

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
      dispatch(refreshData(''));
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