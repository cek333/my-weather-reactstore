import {
  refreshDataPendingAction,
  refreshDataFulfilledAction,
  refreshDataFulfilledActionNoData,
  refreshDataRejectedAction,
  weatherReducer as reducer
} from './store';
import API from '../api/API';
import {
 initialState,
 weatherAPIData,
 expectedState
} from '../util/testData';

describe('store/reducer tests', () => {

  describe('tests at the reducer level', () => {
    test('should handle pending action', () => {
      const actual = reducer(initialState, refreshDataPendingAction());
      expect(actual.status).toEqual('loading');
    });
    test('should handle fulfilled action', () => {
      const actual = reducer(initialState, refreshDataFulfilledAction(weatherAPIData));
      expect(actual.weather.city).toEqual(expectedState.weather.city);
      expect(actual.weather.icon).toEqual(expectedState.weather.icon);
      expect(actual.weather.temperature).toEqual(expectedState.weather.temperature);
      expect(actual.weather.description).toEqual(expectedState.weather.description);
      expect(actual.weather.windSpeed).toEqual(expectedState.weather.windSpeed);
      expect(actual.timestamp).toBeGreaterThan(initialState.timestamp);
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeFalsy();
    });
    test("should handle fulfilled action with no data i.e. city doesn't exist", () => {
      const actual = reducer(initialState, refreshDataFulfilledActionNoData());
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeTruthy();
    });
    test('should handle rejected action', () => {
      const actual = reducer(initialState, refreshDataRejectedAction());
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeTruthy();
    });
  });

  describe.skip('tests at the dispatch level', () => {
    // Need to create a Test Component to test the dispatch of the reducer.
    /*
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('should detect location and fetch weather for that location', async () => {
      jest.spyOn(API, 'detectCity');
      API.detectCity.mockImplementation(() => Promise.resolve(detectAPIData));
      jest.spyOn(API, 'refreshWeatherData');
      API.refreshWeatherData.mockImplementation(() => Promise.resolve(weatherAPIData));
      await refreshData('');
      const actual = store.getState();
      expect(actual.weather.city).toEqual(expectedState.weather.city);
      expect(actual.weather.icon).toEqual(expectedState.weather.icon);
      expect(actual.weather.temperature).toEqual(expectedState.weather.temperature);
      expect(actual.weather.description).toEqual(expectedState.weather.description);
      expect(actual.weather.windSpeed).toEqual(expectedState.weather.windSpeed);
      expect(actual.timestamp).toBeGreaterThan(initialState.timestamp);
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeFalsy();
    });

    test('should not refetch data if less than 10min have elapsed', async () => {
      jest.spyOn(API, 'refreshWeatherData');
      API.refreshWeatherData.mockImplementation(() => Promise.resolve(weatherAPIData));
      const before = store.getState();
      await store.dispatch(refreshData(before.weather.city));
      const after = store.getState();
      expect(before.timestamp).toEqual(after.timestamp);
    });

    test('should fetch data for a different city', async () => {
      jest.spyOn(API, 'refreshWeatherData');
      API.refreshWeatherData.mockImplementation(() => Promise.resolve(weatherAPIData2));
      await store.dispatch(refreshData(expectedState2.weather.city));
      const actual = store.getState();
      expect(actual.weather.city).toEqual(expectedState2.weather.city);
      expect(actual.weather.icon).toEqual(expectedState2.weather.icon);
      expect(actual.weather.temperature).toEqual(expectedState2.weather.temperature);
      expect(actual.weather.description).toEqual(expectedState2.weather.description);
      expect(actual.weather.windSpeed).toEqual(expectedState2.weather.windSpeed);
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeFalsy();
    });

    test('should set error message if API call fails', async () => {
      jest.spyOn(API, 'refreshWeatherData');
      API.refreshWeatherData.mockImplementation(() => Promise.reject('API call fails'));
      await store.dispatch(refreshData(expectedState.weather.city));
      const actual = store.getState();
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeTruthy();
    });

    test("can't fetch data for invalid city", async () => {
      jest.spyOn(API, 'refreshWeatherData');
      API.refreshWeatherData.mockImplementation(() => Promise.resolve(null));
      await store.dispatch(refreshData('invalid city'));
      const actual = store.getState();
      expect(actual.status).toEqual('idle');
      expect(actual.error).toBeTruthy();
    });
    */
  });
});