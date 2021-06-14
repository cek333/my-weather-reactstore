export const initialState = {
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

export const detectAPIData = {
  city: 'Toronto'
};

export const weatherAPIData = {
  name: 'Toronto',
  weather: {
    summary: {
      description: 'scattered clouds',
      icon: '03d'
    },
    temperature: {
      actual: 23.41
    },
    wind: {
      speed: 1.34
    }
  }
};

export const expectedState = {
  weather: {
    city: 'Toronto',
    icon: '03d',
    temperature: 23.41,
    description: 'scattered clouds',
    windSpeed: 1.34
  },
  timestamp: Date.now(), // Note: will check timestamp relative to initial state
  status: 'idle',
  error: ''
};

export const weatherAPIData2 = {
  name: 'Ottawa',
  weather: {
    summary: {
      description: 'broken clouds',
      icon: '04d'
    },
    temperature: {
      actual: 25.06
    },
    wind: {
      speed: 4.12
    }
  }
};

export const expectedState2 = {
  weather: {
    city: 'Ottawa',
    icon: '04d',
    temperature: 25.06,
    description: 'broken clouds',
    windSpeed: 4.12
  },
  timestamp: Date.now(), // Note: will check timestamp relative to initial state
  status: 'idle',
  error: ''
};
