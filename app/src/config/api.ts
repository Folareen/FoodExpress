import axios from "axios"

const BASE_URL = 'http://192.168.231.156:5000/api/v1'

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 8000
})

export const setAxiosToken = (token : string) => {

  return (api.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  ))
}


export default api