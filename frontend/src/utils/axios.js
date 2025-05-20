import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.DEV === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_SERVER_URL + "/api",
  withCredentials: true,
});

export default axiosInstance;
