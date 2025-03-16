import React, { useState } from "react";
import FormComponent from "../forms/RegistrationForm";
import wheel from "../assets/wheel.webp";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { becomeAHost } from "../api";
import ListingHostTermsAndConditions from "../components/tncs/ListingHostTermsAndConditions";
import CarHostTermsAndConditions from "../components/tncs/CarHostTermsAndConditions";
import TourHostTermsAndConditions from "../components/tncs/TourHostTermsAndConditions";
import TermsAndConditions from "../components/tncs/TermsAndConditions";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string().required("Contact is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const HostRegister = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { register } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const hostType = queryParams.get("hostType");

  const handleSubmit = async (values) => {
    try {
      if (!termsAccepted) {
        setShowTerms(true);
        return;
      }
      const { firstName, lastName, contact, email, password } = values;
      const role = "H"; // Default role for hosts

      const res = await becomeAHost({
        firstName,
        lastName,
        contact,
        email,
        password,
        role,
        hostType,
      });

      if (res.data.error) {
        showErrorToast("An account with this email already exists");
        return;
      }

      showSuccessToast("Sign up successful");
      navigate("/login");
    } catch (error) {
      showErrorToast(error.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
          <FormComponent
            title="Become A Host"
            initialValues={{
              firstName: user?.first_name || "",
              lastName: user?.last_name || "",
              contact: user?.contact || "",
              email: user?.email || "",
              password: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            buttonText="Register"
            isRegister
            showTerms={showTerms}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            setShowTerms={setShowTerms}
          />

          <img
            className="hidden md:block md:w-72 lg:w-80 bg-cover bg-center m-10 rounded-xl"
            src={wheel}
            alt="Registration Image"
          />
        </div>
      </div>
      {showTerms && (
        <TermsAndConditions
          setShowTerms={setShowTerms}
          setTermsAccepted={setTermsAccepted}
          body={
            hostType === "L" ? (
              <ListingHostTermsAndConditions />
            ) : hostType === "V" ? (
              <CarHostTermsAndConditions />
            ) : hostType === "T" ? (
              <TourHostTermsAndConditions />
            ) : null
          }
        />
      )}
    </>
  );
};
