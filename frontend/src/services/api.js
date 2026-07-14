 import axios from "axios";

const api = axios.create({
  baseURL: "https://sampledpl.onrender.com/api",
});

export default api;