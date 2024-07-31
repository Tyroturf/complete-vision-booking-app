import axios from "axios";

const api = axios.create({
  baseURL: "https://your-oracle-apex-api-url.com",
});

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const register = (email, password) => {
  return api.post("/register", { email, password });
};

export const fetchCities = () => {
  return api.get("/cities");
};

export const fetchCars = () => {
  return api.get("/cars");
};

export const searchPlaces = (params) => {
  return api.get("/search/places", { params });
};

export const searchCars = (params) => {
  return api.get("/search/places", { params });
};

export const searchTours = (params) => {
  return api.get("/search/places", { params });
};
