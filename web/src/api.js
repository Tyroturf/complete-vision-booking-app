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

export const fetchCar = (id) => {
  const queryString = new URLSearchParams({ p_rental_id: id }).toString();
  
  return api.get(`/vehicle/rental?${queryString}`);
};

export const fetchTour = (id) => {
  const queryString = new URLSearchParams({ p_tour_id: id }).toString();
  
  return api.get(`/tour/tours?${queryString}`);
};

export const bookProperty = (bookingData) => {
  const queryString = new URLSearchParams({
    listing_id: bookingData.listing_id,
    user_id: bookingData.user_id,
    booking_date: bookingData.booking_date,
    first_name: bookingData.first_name,
    last_name: bookingData.last_name,
    contact: bookingData.contact,
    email: bookingData.email,
    num_guests: bookingData.num_guests,
    car_services: bookingData.car_services ? "Y" : "N",
    driving_type: bookingData.driving_type,
    pickup_location: bookingData.pickup_location,
    dropoff_location: bookingData.dropoff_location,
    private_tour: bookingData.private_tour ? "Y" : "N",
    checkin: bookingData.checkin,
    checkout: bookingData.checkout,
    listing_price: bookingData.listing_price,
    ride_price: bookingData.ride_price,
    tour_price: bookingData.tour_price,
    no_nights: bookingData.no_nights,
    total: bookingData.total,
    tour_type: bookingData.tour_type,
    car_id: bookingData.car_id,
    status: bookingData.status,
    host_id: bookingData.host_id,
    fee: bookingData.fee,
    chauffuer_rate: bookingData.chauffuer_rate,
    sub_total: bookingData.sub_total,
    special_note: bookingData.special_note,
    reference_id: bookingData.paymentReference,
  }).toString();

  return api.get(`/property/booking?${queryString}`);
};

export const fetchBookingCars = () => {
  return api.get("/car/details");
}

export const fetchTourTypes = async () => {
  return api.get("/tourtype/type");
};

export const fetchExchangeRate = async () => {
  return api.get("/exchangerate/rate");
};

export const fetchUser = async (queryString) => {
  return api.get(`/user/user_details?${queryString}`);
};

export const uploadDocs = async (queryString) => {
  return api.get(`userdoc/document?${queryString}`);
};

export const becomeAHost = ({ firstName, lastName, contact, email, password, role = "H", hostType }) => {
  const queryString = new URLSearchParams({
    first_name: firstName,
    last_name: lastName,
    contact,
    username: email,
    password,
    role,
    host_type: hostType,
  }).toString();

  const url = `/register/new_user?${queryString}`;

  return api.get(url);
};
