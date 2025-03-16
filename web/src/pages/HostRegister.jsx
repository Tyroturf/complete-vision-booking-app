import React, { useState } from "react";
import FormComponent from "../forms/RegistrationForm";
import wheel from "../assets/wheel.webp";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { becomeAHosRegister, becomeAHost } from "../api";
import ListingHostTermsAndConditions from "../components/tncs/ListingHostTermsAndConditions";
import CarHostTermsAndConditions from "../components/tncs/CarHostTermsAndConditions";
import TourHostTermsAndConditions from "../components/tncs/TourHostTermsAndConditions";
import TermsAndConditions from "../components/tncs/TermsAndConditions";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const validationSchema1 = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const HostRegister = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
      let res;
      if (user) {
        res = await becomeAHost({
          firstName,
          lastName,
          contact,
          email,
          role,
          hostType,
          user: user.user_id,
        });
      } else {
        res = await becomeAHosRegister({
          firstName,
          lastName,
          contact,
          email,
          password,
          role,
          hostType,
        });
      }

      if (res.data.error) {
        showErrorToast("An account with this email already exists");
        return;
      }
      if (
        res.data.status === "success" ||
        res.data.success === "User registered successfully."
      ) {
        showSuccessToast("Sign up successful");
        navigate("/login");
      }
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
            }}
            validationSchema={user ? validationSchema1 : validationSchema}
            onSubmit={handleSubmit}
            buttonText="Register"
            isRegister
            showTerms={showTerms}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            setShowTerms={setShowTerms}
            user={user}
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
