import axios from "axios";

const http = axios.create({
  // baseURL: "http://3.121.198.56:8080", // process.env.ROOT_API,
  baseURL: process.env.REACT_APP_API_URL,
  // timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    // if (err.response) throw new Error(err.response.data.message);
  }
);
export default http;
