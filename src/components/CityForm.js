import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshData } from '../app/store';

function CityForm() {
  const dispatch = useDispatch();

  const defaultCity = useSelector(state => state.weather.city);
  const [city, setCity] = useState('');

  useEffect(() => {
    setCity(defaultCity);
  }, [defaultCity]);

  function handleCityChange(evt) {
    setCity(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (city) {
      dispatch(refreshData(city));
    }
  }

  return (
    <form>
      <label htmlFor='city'>Enter City</label>
      <input type='text' id='city' name='city' placeholder='Please enter city.' value={city}
        onChange={handleCityChange} required />
      <button className='muted-button' type='submit' onClick={handleSubmit}>
        Refresh Weather
      </button>
    </form>
  );
}

export default CityForm;