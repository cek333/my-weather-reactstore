import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

import API from './api/API';
import {
 detectAPIData,
 weatherAPIData,
 expectedState
} from './util/testData';

afterAll(() => {
  jest.resetAllMocks();
});

test('UI smoke test', async () => {
  jest.spyOn(API, 'detectCity');
  API.detectCity.mockImplementation(() => Promise.resolve(detectAPIData));
  jest.spyOn(API, 'refreshWeatherData');
  API.refreshWeatherData.mockImplementation(() => Promise.resolve(weatherAPIData));

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Check that city doesn't exist in initial render
  expect(screen.queryByText(expectedState.weather.city)).toBeNull();
  // screen.debug();
  // Wait for city to be displayed
  expect(await screen.findByText(expectedState.weather.city)).toBeInTheDocument();
  // screen.debug();
  // Check other weather data
  expect(screen.getByText(expectedState.weather.description)).toBeInTheDocument();
  let exp = new RegExp(expectedState.weather.temperature.toString(), 'i');
  expect(screen.getByText(exp)).toBeInTheDocument();
  exp = new RegExp(expectedState.weather.windSpeed.toString(), 'i');
  expect(screen.getByText(exp)).toBeInTheDocument();
});
