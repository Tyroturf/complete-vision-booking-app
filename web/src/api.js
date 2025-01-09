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

export const logout = (p_session_id) => {
  const sessionId = localStorage.getItem("session_id");
  const queryString = new URLSearchParams({ p_session_id }).toString();

  if (!sessionId) return;

  return api.get((`/logout/auth?${queryString}`))
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

export const fetchBookingCars = ({check_in, check_out, num_guests}) => {
  const queryString = new URLSearchParams({
    check_in,
    check_out,
    num_guests,
  }).toString();
  return api.get(`/vehicle/car_list?${queryString}`);
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
  return api.get(`/user/update_user_details?${queryString}`);
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

export const addNewList = async (params) => {
  const queryString = new URLSearchParams({
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_amenities: params.amenities,
    p_max_guests: params.guests,
    p_price: params.price,
    p_special_date_from: params.p_special_date_from,
    p_special_date_to: params.p_special_date_to,
    p_special_price: params.p_special_price,
    p_listing_id: params.listingId,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/listing/Add_Listing?${queryString}`;

  return api.get(url);
};

export const updateList = async (params) => {
  const queryString = new URLSearchParams({
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_amenities: params.description,
    p_max_guests: params.guests,
    p_price: params.price,
    p_listing_id: params.listingId,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/listing/update_listing?${queryString}`;

  return api.get(url);
};

export const fetchListingId = async () => {
  return api.get(`/next/listing_id`);
};


export const fetchListings = async (queryString) => {
  return api.get(`/listing/host_listing?host_id=${queryString}`);
};

export const fetchCarListing = async (queryString) => {
  return api.get(`/vehicle/car_host_listing?host_id=${queryString}`);
};

export const fetchTourListing = async (queryString) => {
  return api.get(`/tour/tour_host_listing?host_id=${queryString}`);
};

export const addNewVehicle = async (params) => {
  console.log(params)
  const queryString = new URLSearchParams({
    p_car_rental_id: params.listingId,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_features: params.features,
    p_max_guests: params.guests,
    p_price: params.price,
    p_car_type: params.carType,
    p_chauffeur_rate: params.chauffeurRate,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/vehicle/Add_Car_Rental?${queryString}`;

  return api.get(url);
};

export const updateVehicle = async (params) => {
  const queryString = new URLSearchParams({
    p_car_rental_id: params.listingId,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_features: params.features,
    p_max_guests: params.guests,
    p_price: params.price,
    p_car_type: params.car_type,
    p_chauffeur_rate: params.chauffeur_rate,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/vehicle/update_car_rental?${queryString}`;

  return api.get(url);
};

export const addNewTour = async (params) => {
  const queryString = new URLSearchParams({
    p_tour_id: params.listingId,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_max_guests: params.guests,
    p_tour_price: params.price,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/tour/Add_tours?${queryString}`;

  return api.get(url);
};

export const updateTour = async (params) => {
  const queryString = new URLSearchParams({
    p_tour_id: params.p_listing_id,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_description: params.description,
    p_max_guests: params.guests,
    p_tour_price: params.price,
    p_image1_url: params.p_image1_url,
    p_image2_url: params.p_image2_url,
    p_image3_url: params.p_image3_url,
    p_image4_url: params.p_image4_url,
    p_image5_url: params.p_image5_url,
  }).toString();

  const url = `/tour/update_tours?${queryString}`;

  return api.get(url);
};

export const deleteListing = async (queryString) => {
  return api.get(`/listing/delete_listing?id=${queryString}`);
};

export const deleteVehicle = async (queryString) => {
  return api.get(`/vehicle/delete_car_rental?id=${queryString}`);
};

export const deleteTour = async (queryString) => {
  return api.get(`/tour/delete_tour?id=${queryString}`);
};

export const fetchAmenities = async () => {
  return api.get("/get/amenities");
};