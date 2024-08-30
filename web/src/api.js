import axios from "axios";

const api = axios.create({
  baseURL: "https://gb3c4b8d5922445-kingsford1.adb.af-johannesburg-1.oraclecloudapps.com/ords/complete",
});

api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem("session_id");
  if (sessionId) {
    config.headers['Authorization'] = `Bearer ${sessionId}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const login = async (email, password) => {
  const loginUrl = `/auth/login?p_username=${encodeURIComponent(email)}&p_password=${encodeURIComponent(password)}`;
  const response = await api.get(loginUrl);

  const user = response.data;
  if (user.status === "Success") {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("session_id", user.session_id);
  }

  return response;
};

export const logout = () => {
  const sessionId = localStorage.getItem("session_id");
  if (!sessionId) return;

  return api.get('/auth/logout')
};

export const register = ({ firstName, lastName, contact, email, password, role }) => {
  const queryString = new URLSearchParams({
    first_name: firstName,
    last_name: lastName,
    contact,
    username: email,
    password,
    role,
  }).toString();

  const url = `/register/new_user?${queryString}`;

  return api.get(url);
};

export const fetchCities = () => {
  return api.get("/cities");
};

export const fetchCars = () => {
  return api.get("/cars");
};

export const searchPlaces = (params) => {
  return api.get('/listing/listings', { params });
};

export const searchCars = (params) => {
  return api.get("/vehicle/rental", { params });
};

export const searchTours = (params) => {
  return api.get("/tour/tours", { params });
};

export const fetchPlace = (id) => {
  const queryString = new URLSearchParams({ p_listing_id: id }).toString();
  
  return api.get(`/listing/listings?${queryString}`);
};