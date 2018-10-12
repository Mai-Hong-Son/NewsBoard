import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
// import _ from 'lodash';

const axiosClient = axios.create({
  baseURL: '',
  responseType: 'json'
});

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('localhost');
    if (value !== null) {
      // We have data!!
      if (_.endsWith(value, ':8080')) {
        axiosClient.defaults.baseURL = value;
      } else {
        axiosClient.defaults.baseURL = '';
      }
    }
  } catch (error) {
    // Error retrieving data
  }
};

export default axiosMiddleware(axiosClient, {
  errorSuffix: ':ERROR',
  interceptors: {
    response: [{
      error: (configs, request) => {
        const { dispatch } = configs;
        const message = request.message;

        return Promise.reject({ ...request, message });
      },
      success: (configs, request) => {
        const { config: { logging } = {} } = request;
        // if (logging) Logger.debug(request);
        return request;
      }
    }]
  },
  successSuffix: ':SUCCESS'
});
