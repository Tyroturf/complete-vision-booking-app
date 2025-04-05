import axios from "axios";

const api = axios.create({
  baseURL:
    "https://gb3c4b8d5922445-kingsford1.adb.af-johannesburg-1.oraclecloudapps.com/ords/complete",
});

api.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email, password) => {
  const loginUrl = `/auth/login?p_username=${encodeURIComponent(
    email
  )}&p_password=${encodeURIComponent(password)}`;
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

  return api.get(`/logout/auth?${queryString}`);
};

export const register = ({
  firstName,
  lastName,
  contact,
  email,
  password,
  role,
}) => {
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
  return api.get("/listing/listings", { params });
};

export const searchCars = (params) => {
  return api.get("/vehicle/rental", { params });
};

export const searchTours = (params) => {
  return api.get("/tour/tours", { params });
};

export const fetchPlace = (params) => {
  const queryString = new URLSearchParams({
    p_listing_id: params.id,
    p_check_in: params.checkIn,
    p_check_out: params.checkOut,
  }).toString();

  return api.get(`/listing/listings?${queryString}`);
};

export const fetchCar = (params) => {
  const queryString = new URLSearchParams({
    p_rental_id: params.id,
    p_check_in: params.checkIn,
    p_check_out: params.checkOut,
  }).toString();

  return api.get(`/vehicle/rental?${queryString}`);
};

export const fetchTour = (params) => {
  const queryString = new URLSearchParams({
    p_tour_id: params.id,
    p_check_in: params.checkIn,
    p_check_out: params.checkOut,
  }).toString();

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
      car_id: bookingData.selectedCar?.ID,
      tour_type: bookingData.selectedTour?.ID,
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

export const saveCarBooking = (bookingData) => {
  const queryString = new URLSearchParams(
    Object.entries({
      RENTAL_ID: bookingData.listing?.ID,
      USER_ID: bookingData.user_id,
      BOOKING_DATE: bookingData.bookingDate,
      FIRST_NAME: bookingData.firstName,
      LAST_NAME: bookingData.lastName,
      CONTACT: bookingData.phoneNumber,
      EMAIL: bookingData.email,
      NUM_GUESTS: bookingData.guests,
      DRIVING_TYPE: bookingData.drivingOption,
      NUM_TRIPS: bookingData.numTrips,
      PICKUP_LOCATION: bookingData.pickupLocation,
      DROPOFF_LOCATION: bookingData.dropoffLocation,
      CHECKIN: bookingData.checkIn,
      CHECKOUT: bookingData.checkOut,
      TOTAL: bookingData.totalPriceGHS,
      CAR_TYPE: bookingData.carType,
      CHAUFFUER_RATE: bookingData.chauffeurRate || undefined,
      NO_DAYS: bookingData.nights || undefined,
      STATUS: bookingData.status,
      DL_PHOTO: bookingData.dlPhoto,
      SELFIE_PHOTO: bookingData.selfiePhoto,
      HOST: bookingData.listing?.HOST_ID,
      FEE: bookingData.serviceFee || undefined,
      SUB_TOTAL: bookingData.subTotal,
    }).filter(([_, value]) => value !== undefined && value !== "")
  ).toString();

  return api.get(`/carbooking/booking?${queryString}`);
};

export const saveTourBooking = (bookingData) => {
  const queryString = new URLSearchParams(
    Object.entries({
      p_TOUR_ID: bookingData.listing?.ID,
      p_USER_ID: bookingData.user_id,
      p_BOOKING_DATE: bookingData.bookingDate,
      p_FIRST_NAME: bookingData.firstName,
      p_LAST_NAME: bookingData.lastName,
      p_CONTACT: bookingData.phoneNumber,
      p_EMAIL: bookingData.email,
      p_NUM_GUESTS: bookingData.guests,
      p_PICKUP_LOCATION: bookingData.pickupLocation,
      p_CHECKIN: bookingData.checkIn,
      p_CHECKOUT: bookingData.checkOut,
      p_TOTAL: bookingData.totalPriceGHS,
      p_NO_DAYS: bookingData.duration,
      p_STATUS: bookingData.status,
      p_SPECIAL_NOTE: bookingData.specialNote,
      p_HOST: bookingData.listing?.HOST_ID,
      p_FEE: bookingData.serviceFee,
      p_SUB_TOTAL: bookingData.subTotal,
      p_REFERENCE_ID: bookingData.referenceId,
      p_BOOKING_ID: bookingData.bookingId,
    }).filter(([_, value]) => value !== undefined && value !== "")
  ).toString();

  return api.get(`/tourbooking/booking?${queryString}`);
};

// export const updateBooking = (bookingData) => {
//   const queryString = new URLSearchParams(
//     Object.entries({
//       booking_id: bookingData.ID,
//       listing_id: bookingData.ListingID,
//       user_id: bookingData.UserID,
//       first_name: bookingData.FirstName,
//       last_name: bookingData.LastName,
//       contact: bookingData.Contact,
//       email: bookingData.Email,
//       num_guests: bookingData.NumGuests,
//       car_services: bookingData.CarID ? "Y" : undefined,
//       driving_type: bookingData.DrivingType,
//       pickup_location: bookingData.PickupLocation,
//       dropoff_location: bookingData.DropoffLocation,
//       private_tour: bookingData.TourType ? "Y" : undefined,
//       checkin: bookingData.Checkin,
//       checkout: bookingData.Checkout,
//       listing_price: bookingData.ListingPrice,
//       ride_price: bookingData.RidePrice || undefined,
//       tour_price: bookingData.TourPrice || undefined,
//       total: bookingData.Total,
//       car_id: bookingData.CarID,
//       tour_type: bookingData.TourType,
//       status: bookingData.Status,
//       fee: bookingData.Fee || undefined,
//       chauffuer_rate: bookingData.ChauffuerRate || undefined,
//       sub_total: bookingData.SubTotal,
//       special_note: bookingData.SpecialNote,
//       reference_id: bookingData.ReferenceID,
//     }).filter(([_, value]) => value !== undefined && value !== "")
//   ).toString();

//   return api.get(`/property/update_booking_by_user?${queryString}`);
// };

export const cancelPlaceBooking = ({ booking_id, status }) => {
  const queryString = new URLSearchParams({
    p_BOOKING_ID: booking_id,
    p_STATUS: status,
  });

  return api.get(`/property/update_booking_by_user?${queryString}`);
};

export const cancelCarBooking = ({ booking_id, status }) => {
  const queryString = new URLSearchParams({
    p_BOOKING_ID: booking_id,
    p_STATUS: status,
  });

  return api.get(`/carbooking/update_car_booking?${queryString}`);
};

export const cancelTourBooking = ({ booking_id, status }) => {
  const queryString = new URLSearchParams({
    p_BOOKING_ID: booking_id,
    p_STATUS: status,
  });

  return api.get(`/tourbooking/update_tour_booking?${queryString}`);
};

export const fetchBookingCars = ({ check_in, check_out, num_guests }) => {
  const queryString = new URLSearchParams({
    check_in,
    check_out,
    num_guests,
  }).toString();
  return api.get(`/vehicle/car_list?${queryString}`);
};

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

export const becomeAHost = ({
  firstName,
  lastName,
  contact,
  email,
  role = "H",
  hostType,
  user,
}) => {
  const queryString = new URLSearchParams({
    p_first_name: firstName,
    p_last_name: lastName,
    p_contact: contact,
    p_username: email,
    p_role: role,
    p_host_type: hostType,
    p_user_id: user,
  }).toString();

  const url = `/user/update_user_details?${queryString}`;

  return api.get(url);
};

export const becomeAHosRegister = ({
  firstName,
  lastName,
  contact,
  email,
  password,
  role = "H",
  hostType,
}) => {
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
    p_city: params.city,
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
    p_city: params.city,
    p_description: params.description,
    p_amenities: params.amenities,
    p_max_guests: params.guests,
    p_price: params.price,
    p_listing_id: params.listingId,
    p_special_date_from: params.p_special_date_from,
    p_special_date_to: params.p_special_date_to,
    p_special_price: params.p_special_price,
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

export const fetchPlaceBookings = async (queryString) => {
  return api.get(`/property/host_bookings?p_user_id=${queryString}`);
};

export const fetchCarBookings = async (queryString) => {
  return api.get(`/carbooking/host_bookings?p_user_id=${queryString}`);
};

export const fetchTourBookings = async (queryString) => {
  return api.get(`/tourbooking/host_bookings?p_user_id=${queryString}`);
};

export const addNewVehicle = async (params) => {
  const queryString = new URLSearchParams({
    p_car_rental_id: params.listingId,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_city: params.city,
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
    p_city: params.city,
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
    p_city: params.city,
    p_description: params.description,
    p_max_guests: params.guests,
    p_tour_price: params.price,
    p_tour_type: params.tour_type,
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
    p_tour_id: params.listingId,
    p_host_id: params.hostId,
    p_list_name: params.listName,
    p_location: params.location,
    p_city: params.city,
    p_description: params.description,
    p_max_guests: params.guests,
    p_tour_price: params.price,
    p_tour_type: params.tour_type,
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

export const verifyPayment = async ({ booking_id, reference_id }) => {
  const queryString = new URLSearchParams({
    booking_id,
    reference_id,
  });
  return api.get(`/verify/paystack?${queryString}`);
};

export const fetchPastStaysBookings = async (queryString) => {
  return api.get(`/property/user_bookings?P_USER_ID=${queryString}`);
};

export const fetchPastCarBookings = async (queryString) => {
  return api.get(`/carbooking/user_bookings?P_USER_ID=${queryString}`);
};

export const fetchPastTourBookings = async (queryString) => {
  return api.get(`/tourbooking/user_bookings?P_USER_ID=${queryString}`);
};

export const fetchBooking = async (queryString) => {
  return api.get(`/property/booking_details?P_BOOKING_ID=${queryString}`);
};

export const fetchCarBooking = async (queryString) => {
  return api.get(`/carbooking/car_booking_details?P_BOOKING_ID=${queryString}`);
};

export const fetchTourBooking = async (queryString) => {
  return api.get(
    `/tourbooking/tour_booking_details?P_BOOKING_ID=${queryString}`
  );
};

export const blockPlaceDates = async ({
  listing_id,
  user_id,
  booking_date,
  checkin,
  checkout,
  status,
  host_id,
}) => {
  const queryString = new URLSearchParams({
    listing_id,
    user_id,
    booking_date,
    checkin,
    checkout,
    status,
    host_id,
  }).toString();

  const url = `/property/block_dates?${queryString}`;

  return api.get(url);
};

export const blockCarDates = async ({
  listing_id,
  user_id,
  booking_date,
  checkin,
  checkout,
  status,
  host_id,
}) => {
  const queryString = new URLSearchParams({
    rental_id: listing_id,
    user_id,
    booking_date,
    checkin,
    checkout,
    status,
    host_id,
  }).toString();

  const url = `/carbooking/block_dates?${queryString}`;

  return api.get(url);
};

export const blockTourDates = async ({
  p_TOUR_ID: listing_id,
  user_id,
  booking_date,
  checkin,
  checkout,
  status,
  host_id,
}) => {
  const queryString = new URLSearchParams({
    listing_id,
    user_id,
    booking_date,
    checkin,
    checkout,
    status,
    host_id,
  }).toString();

  const url = `/tourbooking/block_dates?${queryString}`;

  return api.get(url);
};

export const updateBlockDates = async ({ checkin, checkout, booking_id }) => {
  const queryString = new URLSearchParams({
    p_BOOKING_ID: booking_id,
    p_CHECKIN: checkin,
    p_CHECKOUT: checkout,
  }).toString();

  const url = `/property/update_booking_by_user?${queryString}`;

  return api.get(url);
};

export const fetchBlockedBookings = async (queryString) => {
  return api.get(`/property/blocked_bookings?P_USER_ID=${queryString}`);
};

export const deleteBlockedBooking = async (queryString) => {
  return api.get(`/property/delete_booking?P_BOOKING_ID=${queryString}`);
};

export const updateUserDetails = ({
  firstName,
  lastName,
  contact,
  email,
  id,
}) => {
  const queryString = new URLSearchParams(
    Object.entries({
      p_first_name: firstName,
      p_last_name: lastName,
      p_contact: contact,
      p_username: email,
      p_user_id: id,
    }).filter(([_, value]) => value !== undefined && value !== "")
  ).toString();

  const url = `/user/update_user_details?${queryString}`;

  return api.get(url);
};

export const addBankAccount = ({
  p_bank_account_num,
  p_bank_type,
  p_bank_name,
  p_user_id,
}) => {
  const queryString = new URLSearchParams({
    p_bank_account_num,
    p_bank_type,
    p_bank_name,
    p_user_id,
  }).toString();

  const url = `/user/update_user_details?${queryString}`;

  return api.get(url);
};

export const fetchHostBookingCount = (queryString) => {
  return api.get(`/property/host_booking_count?${queryString}`);
};

export const fetchHostBookingSum = (queryString) => {
  return api.get(`/property/host_booking_sum?${queryString}`);
};

export const fetchHostBookingList = (queryString) => {
  return api.get(`/property/host_bookings?${queryString}`);
};

export const fetchCarHostBookingCount = (queryString) => {
  return api.get(`/carbooking/host_booking_count?${queryString}`);
};

export const fetchCarHostBookingSum = (queryString) => {
  return api.get(`/carbooking/host_booking_sum?${queryString}`);
};

export const fetchCarHostBookingList = (queryString) => {
  return api.get(`/carbooking/host_bookings?${queryString}`);
};

export const fetchTourHostBookingCount = (queryString) => {
  return api.get(`/tourrbooking/host_booking_count?${queryString}`);
};

export const fetchTourHostBookingSum = (queryString) => {
  return api.get(`/tourrbooking/host_booking_sum?${queryString}`);
};

export const fetchTourHostBookingList = (queryString) => {
  return api.get(`/tourrbooking/host_bookings?${queryString}`);
};

export const fetchGuestPlaceBookingCount = (queryString) => {
  return api.get(`/user/user_booking_count?${queryString}`);
};

export const fetchGuestCarBookingCount = (queryString) => {
  return api.get(`/user/user_car_booking_count?${queryString}`);
};

export const fetchGuestTourBookingCount = (queryString) => {
  return api.get(`/user/user_tour_booking_count?${queryString}`);
};

export const fetchBanks = () => {
  return api.get("/bank/details");
};

export const updatePassword = ({
  p_user_id,
  p_current_password,
  p_new_password,
}) => {
  const queryString = new URLSearchParams({
    p_user_id,
    p_current_password,
    p_new_password,
  }).toString();

  const url = `/user/password?${queryString}`;

  return api.get(url);
};

export const forgotPassword = (p_username) => {
  const queryString = new URLSearchParams({
    p_username,
  }).toString();

  const url = `/user/forgot_password?${queryString}`;

  return api.get(url);
};

export const verifyToken = ({ p_username, p_reset_code }) => {
  const queryString = new URLSearchParams({
    p_username,
    p_reset_code,
  }).toString();

  const url = `/user/verify_code?${queryString}`;

  return api.get(url);
};

export const resetPassword = (p_user_name, p_new_password) => {
  const queryString = new URLSearchParams({
    p_user_name,
    p_new_password,
  }).toString();

  const url = `/user/current_password?${queryString}`;

  return api.get(url);
};
