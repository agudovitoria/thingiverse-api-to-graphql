import axios, { AxiosResponse, AxiosError } from 'axios';

const { THINGIVERSE_API_URL } = process.env;

const AxiosConfig = () => {
  axios.defaults.baseURL = THINGIVERSE_API_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const extractError = (errors: Error[]) => errors[0];
  const getPromiseRejectedForFirstErrorOf = (errors: Error[]) => Promise.reject(extractError(errors));
  const onRejected = (response: AxiosError) => response;

  const onFulfilled = ({ data }: AxiosResponse) => {
    if (data.errors) {
      return getPromiseRejectedForFirstErrorOf(data.errors);
    }

    if (data.data) {
      return data.data;
    }

    return data;
  };

  axios.interceptors.response.use(onFulfilled, onRejected);
};

export default AxiosConfig;