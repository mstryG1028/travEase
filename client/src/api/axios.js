import axios from "axios";
import { API_URL } from "../utils/constants";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // IMPORTANT if using cookies
});



export default api;
