import React, { createContext, useReducer, useContext } from 'react';
import produce from 'immer';
import API from '../api/API';

const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes as milliseconds

const initialState = {
  weather: {
    city: '',
    icon: 'empty',
    temperature: '',
    description: '',
    windSpeed: ''
  },
  timestamp: Date.now(),
  status: 'idle',
  error: ''
};

export const refreshDataPendingAction = () => ({
  type: 'weather/refresh/pending',
  payload: { }
});
const refreshDataPendingActionType = refreshDataPendingAction().type;

export const refreshDataFulfilledAction = (payload = {}) => ({
  type: 'weather/refresh/fulfilled',
  payload
});
const refreshDataFulFilledActionType = refreshDataFulfilledAction().type;

// This 'NoData' action is for testing only
export const refreshDataFulfilledActionNoData = () => ({
  type: 'weather/refresh/fulfilled',
  payload: null
});

export const refreshDataRejectedAction = (payload = {}) => ({
  type: 'weather/refresh/rejected',
  payload
});
const refreshDataRejectedActionType = refreshDataRejectedAction().type;

export const weatherReducer = produce((draft, action) => {
  // eslint-disable-next-line default-case
  switch(action.type) {
    case refreshDataPendingActionType:
      draft.status = 'loading';
      // Clear any previous error
      draft.error = '';
      break;
    case refreshDataFulFilledActionType:
      // console.log('refreshData.fulfilled data=', action.payload);
      if (action.payload) {
        const {
          name,
          weather: {
            summary: {
              description,
              icon
            },
            temperature: {
              actual
            },
            wind: {
              speed
            }
          }
        } = action.payload;
        draft.weather.city = name;
        draft.weather.icon = icon;
        draft.weather.temperature = actual;
        draft.weather.description = description;
        draft.weather.windSpeed = speed;
        draft.timestamp = Date.now();
      } else {
        // City specified was invalid
        draft.error = 'Unable to get data for city specified/detected. Please enter valid city name.'
      }
      draft.status = 'idle';
      break;
    case refreshDataRejectedActionType:
      draft.status = 'idle';
      draft.error = 'Error fetching weather data. Please try again later.'
      // console.log('refreshData.rejected data=', action.payload);
      break;
  }
}, {});

const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const refreshData = async (newCity) => {
    const { weather: { city }, timestamp } = state;
    // Note: on startup city/newCity may be ''
    if (city && newCity && city === newCity) {
      // Check if 10min has elaspse
      if ((Date.now() - timestamp) < TEN_MINUTES) {
        // console.log('Refresh Aborted! Less than 10min have passed!');
        return;
      }
    }
    // newCity or city data is older than 10min. Trigger loading state.
    dispatch(refreshDataPendingAction());

    let response;
    let queryCity;
    try {
      if (newCity === '') {
        // Detect new city first
        response = await API.detectCity();
        // Note, if city name is invalid, weather data will be null, and reducer will pass error message to user
        queryCity = response.city;
      } else {
        queryCity = newCity;
      }
      response = await API.refreshWeatherData(queryCity);
      // The value we return becomes the `fulfilled` action payload
      dispatch(refreshDataFulfilledAction(response));
    } catch (err) {
      dispatch(refreshDataRejectedAction());
    }
  }
  const value = { state, dispatch, refreshData };
  return <Provider value={value} {...props} />;
}

const useGlobalContext = () => {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };

