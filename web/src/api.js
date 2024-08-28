import axios from "axios";

const api = axios.create({
  baseURL: "https://gb3c4b8d5922445-kingsford1.adb.af-johannesburg-1.oraclecloudapps.com/ords/complete",
});

export const login = (email, password) => {
  const loginUrl = `/auth/login?p_username=${encodeURIComponent(email)}&p_password=${encodeURIComponent(password)}`;
  return api.get(loginUrl);
};

export const register = ({ firstName, lastName, contact, email, password, role }) => {
  console.log({ firstName, lastName, contact, email, password, role });

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
  console.log(params)

  return api.get("/listing/listings", { params });
};

export const searchCars = (params) => {
  return api.get("/vehicle/rental", { params });
};

export const searchTours = (params) => {
  return api.get("/tour/tours", { params });
};
