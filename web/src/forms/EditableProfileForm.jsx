import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import UploadDL from "../components/upload/UploadDL";
import UploadSelfie from "../components/upload/UploadSelfie";
import { useReservation } from "../contexts/ReservationContext";
import { uploadDocs } from "../api";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const EditableProfileForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  isEditing,
  first_last,
  last_name,
  contact,
  email,
  isLoading,
  setIsEditing,
}) => {
  const [showDLUploadModal, setShowDLUploadModal] = useState(false);
  const [showSelfieUploadModal, setShowSelfieUploadModal] = useState(false);
  const { reservationData, setReservationData } = useReservation();
  const [isUploading, setIsUploading] = useState(false);

  const toggleUploadDLModal = () => {
    setShowDLUploadModal(!showDLUploadModal);
  };
  const toggleUploadSelfieModal = () => {
    setShowSelfieUploadModal(!showSelfieUploadModal);
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
        if (
          response.data.message === "User credentials updated successfully."
        ) {
          showSuccessToast("Driver License uploaded successfully");
          setIsEditing(!isEditing);
        } else {
          showErrorToast("Upload Failed. Try again");
        }
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
        if (
          response.data.message === "User credentials updated successfully."
        ) {
          showSuccessToast("Selfie uploaded successfully");
          setIsEditing(!isEditing);
        } else {
          showErrorToast("Upload Failed. Try again");
        }
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
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="space-y-4">
              {renderInputField(
                "firstName",
                "First Name",
                isEditing,
                first_last
              )}
              {renderInputField("lastName", "Last Name", isEditing, last_name)}
              {renderInputField("contact", "Contact", isEditing, contact)}
              {renderInputField("email", "Email", isEditing, email, "email")}

              {/* Password Fields */}
              {isEditing && (
                <>
                  {renderInputField(
                    "currentPassword",
                    "Current Password",
                    true,
                    "",
                    "password"
                  )}
                  {renderInputField(
                    "newPassword",
                    "New Password",
                    true,
                    "",
                    "password"
                  )}
                  {renderInputField(
                    "confirmNewPassword",
                    "Confirm New Password",
                    true,
                    "",
                    "password"
                  )}
                </>
              )}

              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={toggleUploadSelfieModal}
                  className="border text-brand px-4 py-2 rounded-md text-xs hover:scale-105 transition mt-4"
                >
                  Upload Selfie
                </button>

                <button
                  type="button"
                  onClick={toggleUploadDLModal}
                  className="border text-brand px-4 py-2 rounded-md text-xs hover:scale-105 transition mt-4"
                >
                  Upload Driver's License
                </button>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full bg-brand text-white py-2 rounded-md font-bold hover:scale-105 transition-transform duration-200 text-xs flex justify-center items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isLoading ? <Loader /> : "Save"}
                </button>
              )}
            </Form>
          );
        }}
      </Formik>

      <Modal isOpen={showDLUploadModal} onClose={toggleUploadDLModal}>
        <UploadDL handleSubmit={uploadDL} isUploading={isUploading} />
      </Modal>
      <Modal isOpen={showSelfieUploadModal} onClose={toggleUploadSelfieModal}>
        <UploadSelfie handleSubmit={uploadSelfie} isUploading={isUploading} />
      </Modal>
    </>
  );
};

const renderInputField = (name, label, isEditing, value, type = "text") => {
  return (
    <div className="relative">
      {isEditing ? (
        <>
          <Field
            type={type}
            name={name}
            id={name}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px]"
            placeholder=""
          />
          <label
            htmlFor={name}
            className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
          >
            {label}
          </label>
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </>
      ) : (
        <p className="text-gray-700">
          <span className="font-semibold">{label}:</span> {value}
        </p>
      )}
    </div>
  );
};

export default EditableProfileForm;
