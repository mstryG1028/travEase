import axios from "axios";
import { API_URL } from "../utils/constants";

const api = axios.create({
  baseURL: " import.meta.env.VITE_API_URL",
  withCredentials: true, // IMPORTANT if using cookies
});



export default api;
