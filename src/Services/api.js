import axios from "axios";

const api = axios.create({
  baseURL: "https://image-fraud-detection-production.up.railway.app",
});

export default api;