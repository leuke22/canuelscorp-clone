import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://canuelscorp.onrender.com" + "/api",
  withCredentials: true,
});

export default axiosInstance;
