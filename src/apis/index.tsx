import axios from "axios";

export const apiEonet = axios.create({
  baseURL: import.meta.env.VITE_API_OENET,
});
