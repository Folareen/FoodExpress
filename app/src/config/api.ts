import axios from "axios"

const BASE_URL = 'http://192.168.231.156:5000/api/v1'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {         
        Accept: 'application/json',
        'Content-Type': 'application/json;charse=UTF-8'
    },
    timeout: 8000
})

export const setAxiosToken = (token: string) => {
      if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}

export default api