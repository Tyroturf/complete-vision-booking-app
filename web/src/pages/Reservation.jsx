import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReservationForm from "../forms/ReservationForm";
// import { RatingSummary } from "../components/Review";
import BookingSummary from "../components/BookingSummary";
import Modal from "../components/Modal";
import Confirmation from "../pages/Confirmation";
import { useAuth } from "../contexts/AuthContext";
import { fetchPlace, fetchCar, fetchTour, fetchUser, uploadDocs } from "../api";
import { useReservation } from "../contexts/ReservationContext";
import { formatDate } from "../utils/helpers";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";

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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDLUploadModal, setShowDLUploadModal] = useState(false);
  const [showSelfieUploadModal, setShowSelfieUploadModal] = useState(false);
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
    driverLicense: user.DL_PHOTO_URL || "",
    selfie: user.SELFIE_PHOTO_URL || "",
  });

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const fetchUserDetails = async () => {
    const { user_id } = JSON.parse(localStorage.getItem("user"));
    if (user_id) {
      try {
        const response = await fetchUser(`p_user_id=${user_id}`);
        const userDetails = response.data["User Details"][0];
        setUserDetails(userDetails);

        setInitialValues((prevValues) => ({
          ...prevValues,
          firstName: userDetails.FIRST_NAME || "",
          lastName: userDetails.LAST_NAME || "",
          phoneNumber: userDetails.CONTACT || "",
          email: userDetails.USERNAME || "",
          driverLicense: userDetails.DL_PHOTO_URL
            ? userDetails.DL_PHOTO_URL
            : "",
          selfie: userDetails.SELFIE_PHOTO_URL
            ? userDetails.SELFIE_PHOTO_URL
            : "",
        }));

        setReservationData((prevData) => ({
          ...prevData,
          firstName: userDetails.first_name || "",
          lastName: userDetails.last_name || "",
          phoneNumber: userDetails.contact || "",
          email: userDetails.email || "",
          driverLicense: userDetails.DL_PHOTO_URL
            ? userDetails.DL_PHOTO_URL
            : "",
          selfie: userDetails.SELFIE_PHOTO_URL
            ? userDetails.SELFIE_PHOTO_URL
            : "",
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
        const q = {
          id,
          checkIn: params.get("p_check_in") ?? formatDate(today),
          checkOut: params.get("p_check_out") ?? formatDate(tomorrow),
        };
        if (type === "listings") {
          response = await fetchPlace(q);
          setData(response.data.listings[0]);
        } else if (type === "car_rentals") {
          response = await fetchCar(q);
          setData(response.data.car_rentals[0]);
          setReservationData((prevData) => ({
            ...prevData,
            interestedInCar: true,
            selectedCar: response.data.car_rentals[0],
          }));
        } else if (type === "tours") {
          response = await fetchTour(q);
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

  const handleSubmit = async () => {
    try {
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to reserve", error);
    }
  };

  const togglePolicy = () => {
    setShowFullPolicy(!showFullPolicy);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const uploadDL = async () => {
    const { driverLicense } = reservationData;
    const { user_id } = JSON.parse(localStorage.getItem("user"));

    const bucketUrl =
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

    const uploadUrl = `${bucketUrl}${user_id}_dl`;
    setIsUploading(true);

    const r = await axios.put(uploadUrl, driverLicense, {
      headers: {
        "Content-Type": driverLicense?.type,
      },
    });

    if (r.status === 200) {
      try {
        const payload = {
          p_user_id: user_id,
          p_dl_photo_url: uploadUrl,
        };

        const queryString = new URLSearchParams(payload).toString();

        const response = await uploadDocs(queryString);
        await fetchUserDetails();
        showSuccessToast("Driver License uploaded successfully");
      } catch (error) {
        console.error("Error uploading driver licence", error);
        showErrorToast("Failed to upload driver licence");
      } finally {
        setIsUploading(false);
        setShowDLUploadModal(false);
      }
    } else {
      throw new Error("Upload failed with status " + response.status);
    }
  };

  const uploadSelfie = async () => {
    const { selfie } = reservationData;
    const { user_id } = JSON.parse(localStorage.getItem("user"));

    const bucketUrl =
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

    const uploadUrl = `${bucketUrl}${user_id}_selfie`;
    setIsUploading(true);

    const r = await axios.put(uploadUrl, selfie, {
      headers: {
        "Content-Type": selfie?.type,
      },
    });

    if (r.status === 200) {
      try {
        const payload = {
          p_user_id: user_id,
          p_selfie_photo_url: uploadUrl,
        };

        const queryString = new URLSearchParams(payload).toString();

        const response = await uploadDocs(queryString);
        await fetchUserDetails();
        showSuccessToast("Selfie uploaded successfully");
      } catch (error) {
        console.error("Error uploading selfie", error);
        showErrorToast("Failed to upload selfie");
      } finally {
        setIsUploading(false);
        setShowSelfieUploadModal(false);
      }
    } else {
      throw new Error("Upload failed with status " + response.status);
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 md:border border-brand md:p-6 rounded-lg">
          <div className="flex justify-between gap-x-3">
            <img
              src={data?.IMAGE1_URL}
              className="w-1/2 h-28 lg:h-56 object-cover rounded-lg"
              alt={data?.LIST_NAME || "icon"}
              onClick={() => handleImageClick()}
            />
            {isImageModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <button
                  className="absolute top-4 right-4 text-white text-3xl font-bold"
                  onClick={() => closeImageModal()}
                >
                  ✕
                </button>
                <img
                  src={data?.IMAGE1_URL}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                  alt={data?.LIST_NAME || "image"}
                />
              </div>
            )}
            <div className="flex flex-col justify-center gap-y-1">
              <span className="font-medium text-sm">{data?.LIST_NAME}</span>
              {/* <RatingSummary /> */}
              <span className="font-thin text-xs">{data?.LOCATION}</span>
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
              uploadDL={uploadDL}
              uploadSelfie={uploadSelfie}
              isUploading={isUploading}
              showDLUploadModal={showDLUploadModal}
              showSelfieUploadModal={showSelfieUploadModal}
              setShowDLUploadModal={setShowDLUploadModal}
              setShowSelfieUploadModal={setShowSelfieUploadModal}
            />
          </div>
        </div>

        <div className="flex items-center">
          <BookingSummary
            page={page}
            showFullPolicy={showFullPolicy}
            togglePolicy={togglePolicy}
          />
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={closeConfirmation}>
        <Confirmation bookingDetails={reservationData} page={page} />
      </Modal>
    </div>
  );
};

export default Reservation;
