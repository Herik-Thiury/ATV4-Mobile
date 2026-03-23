import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.hgbrasil.com/weather",
});