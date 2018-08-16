import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// import _ from 'lodash';

const axiosClient = axios.create({
  baseURL: 'http://35.231.242.252:8080',
  responseType: 'json'
});

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
