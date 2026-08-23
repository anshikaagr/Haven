import axios from "axios";

const api = axios.create({
  baseURL: "https://haven-ro2u.onrender.com/api",
});

export default api;