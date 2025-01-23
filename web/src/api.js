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

export const fetchPlace = (params) => {
  const queryString = new URLSearchParams({ p_listing_id: params.id, p_check_in: params.checkIn, p_check_out: params.checkOut }).toString();
  
  return api.get(`/listing/listings?${queryString}`);
};

export const fetchCar = (params) => {
  const queryString = new URLSearchParams({ p_rental_id: params.id }).toString();
  
  return api.get(`/vehicle/rental?${queryString}`);
};

export const fetchTour = (params) => {
  const queryString = new URLSearchParams({ p_tour_id: params.id }).toString();
  
  return api.get(`/tour/tours?${queryString}`);
};

export const saveBooking = (bookingData) => {
  const queryString = new URLSearchParams(
    Object.entries({
      listing_id: bookingData.listing?.ID,
      user_id: bookingData.user_id,
      booking_date: bookingData.bookingDate,
      first_name: bookingData.firstName,
      last_name: bookingData.lastName,
      contact: bookingData.phoneNumber,
      email: bookingData.email,
      num_guests: bookingData.guests,
      car_services: bookingData.interestedInCar ? "Y" : undefined,
      driving_type: bookingData.drivingOption,
      pickup_location: bookingData.pickupLocation,
      dropoff_location: bookingData.dropoffLocation,
      private_tour: bookingData.interestedInTour ? "Y" : undefined,
      checkin: bookingData.checkIn,
      checkout: bookingData.checkOut,
      listing_price: bookingData.listingPrice,
      ride_price: bookingData.carPrice || undefined,
      tour_price: bookingData.tourPrice || undefined,
      no_nights: bookingData.nights || undefined,
      total: bookingData.totalPriceGHS,
      tour_type: bookingData.selectedTour?.LIST_NAME,
      car_id: bookingData.selectedCar?.CAR_ID,
      status: bookingData.status,
      host_id: bookingData.listing?.HOST_ID,
      fee: bookingData.serviceFee || undefined,
      chauffuer_rate: bookingData.chauffeurRate || undefined,
      sub_total: bookingData.subTotal,
      special_note: bookingData.specialRequests,
      reference_id: bookingData.paymentReference,
    }).filter(([_, value]) => value !== undefined && value !== "")
  ).toString();

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
    p_amenities: params.amenities,
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

export const verifyPayment = async (queryString) => {
  return api.get(`/verify/paystack?reference_id=${queryString}`);
};

export const fetchPastStaysBookings = async (queryString) => {
  return api.get(`/property/user_bookings?P_USER_ID=${queryString}`);
};

export const fetchBooking = async (queryString) => {
  return api.get(`/property/booking_details?P_BOOKING_ID=${queryString}`);
};