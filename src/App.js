import React from 'react';
import WeatherInfo from './components/WeatherInfo';
import CityForm from './components/CityForm';
import './App.css';

function App() {
  return (
    <div className='card'>
      <WeatherInfo />
      <br />
      <CityForm />
    </div>
  );
}

export default App;
