import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure /api is included
});

export default api;
