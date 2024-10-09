import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReservationForm from "../forms/ReservationForm";
import { RatingSummary } from "../components/Review";
import BookingSummary from "../components/BookingSummary";
import Modal from "../components/Modal";
import Confirmation from "../pages/Confirmation";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchPlace,
  fetchCar,
  fetchTour,
  bookProperty,
  fetchUser,
  uploadDocs,
} from "../api";
import { useReservation } from "../contexts/ReservationContext";
import { formatDate } from "../utils/helpers";

const Reservation = ({ type }) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const location = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const params = new URLSearchParams(location.search);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [data, setData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { reservationData, setReservationData } = useReservation();
  const [initialValues, setInitialValues] = useState({
    firstName: user.first_name || "",
    lastName: user.last_name || "",
    guests: params.get("p_num_guests") || 1,
    phoneNumber: user.contact || "",
    email: user.email || "",
    checkIn: params.get("p_check_in") ?? formatDate(today),
    checkOut: params.get("p_check_out") ?? formatDate(tomorrow),
    dropoffLocation: "",
    pickupLocation: "",
    selectedTour: null,
    selectedCar: null,
  });

  const fetchUserDetails = async () => {
    const { user_id } = JSON.parse(localStorage.getItem("user"));
    console.log(user_id);
    if (user_id) {
      try {
        const response = await fetchUser(`p_user_id=${user_id}`);
        const userDetails = response.data["User Details"][0];
        console.log("userDetails", userDetails);
        setUserDetails(userDetails);

        setInitialValues((prevValues) => ({
          ...prevValues,
          firstName: userDetails.FIRST_NAME || "",
          lastName: userDetails.LAST_NAME || "",
          phoneNumber: userDetails.CONTACT || "",
          email: userDetails.USERNAME || "",
          driverLicense: userDetails.DLFILETYPE ? userDetails.DLFILETYPE : null,
          selfie: userDetails.SELFIEFILETYPE
            ? userDetails.SELFIEFILETYPE
            : null,
        }));

        setReservationData((prevData) => ({
          ...prevData,
          firstName: userDetails.first_name || "",
          lastName: userDetails.last_name || "",
          phoneNumber: userDetails.contact || "",
          email: userDetails.email || "",
          driverLicense: userDetails.DLFILETYPE ? userDetails.DLFILETYPE : null,
          selfie: userDetails.SELFIEFILETYPE
            ? userDetails.SELFIEFILETYPE
            : null,
        }));
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    }
  };

  useEffect(() => {
    if ("car_rentals".includes(location.pathname.split("/")[2])) {
      setPage("car");
    } else if ("tours".includes(location.pathname.split("/")[2])) {
      setPage("tour");
    } else {
      setPage("place");
    }
  }, [page]);

  useEffect(() => {
    fetchUserDetails();
  }, [setReservationData]);

  useEffect(() => {
    setReservationData((prevData) => ({
      ...prevData,
      ...initialValues,
    }));
  }, [initialValues, setReservationData]);

  useEffect(() => {
    if (data)
      setReservationData((prevData) => ({
        ...prevData,
        listing: data,
      }));
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === "listings") {
          response = await fetchPlace(id);
          setData(response.data.listings[0]);
        } else if (type === "car_rentals") {
          response = await fetchCar(id);
          setData(response.data.car_rentals[0]);
          setReservationData((prevData) => ({
            ...prevData,
            interestedInCar: true,
            selectedCar: response.data.car_rentals[0],
          }));
        } else if (type === "tours") {
          response = await fetchTour(id);
          setData(response.data.tours[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, type]);

  const handleSubmit = async (values) => {
    try {
      console.log("Reservation details:", values);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to reserve", error);
    }
  };

  const confirmBooking = async (paymentReference) => {
    const { reservationData } = useReservation();

    const bookingDetails = { ...reservationData, paymentReference };

    try {
      const response = await bookProperty(bookingDetails);
      const result = await response.json();
      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert(`Booking failed: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const togglePolicy = () => {
    setShowFullPolicy(!showFullPolicy);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const uploadDocuments = async () => {
    const driverLicense = reservationData.driverLicense;
    const selfie = reservationData.selfie;

    const queryString = `user_id=1&dl_photo=${encodeURIComponent(
      driverLicense.name
    )}&dlmmetype=${
      driverLicense.type
    }&dlfiletype=jpeg&selfiephoto=${encodeURIComponent(
      selfie.name
    )}&selfiemmetype=${selfie.type}&selfietype=jpeg`;

    try {
      const response = await uploadDocs(queryString);
      console.log("res", response);
      setShowUploadModal(false);
      await fetchUserDetails();
      alert("Documents uploaded successfully");
    } catch (error) {
      console.error("Error uploading documents", error);
      alert("Failed to upload documents");
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 md:border border-brand md:p-6 rounded-lg">
          <div className="flex justify-between gap-x-3">
            <img
              src={data.IMAGE_URL}
              className="w-1/2 h-28 lg:h-56 object-cover rounded-lg"
              alt={data.LIST_NAME || "icon"}
            />
            <div className="flex flex-col justify-center gap-y-1">
              <span className="font-medium text-sm">{data.LIST_NAME}</span>
              <RatingSummary />
              <span className="font-thin text-xs">{data.LOCATION}</span>
            </div>
          </div>

          <div className="space-y-5">
            <span className="font-bold text-sm">Enter your details</span>
            <ReservationForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              listing={data}
              user={userDetails}
              page={page}
              uploadDocuments={uploadDocuments}
            />
          </div>
        </div>

        <div className="flex items-center">
          <BookingSummary
            showFullPolicy={showFullPolicy}
            togglePolicy={togglePolicy}
          />
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={closeConfirmation}>
        <Confirmation
          bookingDetails={reservationData}
          onSubmit={confirmBooking}
          page={page}
        />
      </Modal>
    </div>
  );
};

export default Reservation;
