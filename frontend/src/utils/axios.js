import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://canuelscorp.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
