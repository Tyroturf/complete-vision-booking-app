import React, { useState } from "react";
import FormComponent from "../forms/RegistrationForm";
import wheel from "../assets/wheel.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import TermsAndConditions from "../components/tncs/TermsAndConditions";
import CustomerTermsAndConditions from "../components/tncs/CustomerTermsAndConditions";

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

export const Register = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (!termsAccepted) {
      setShowTerms(true);
      return;
    }
    try {
      const { firstName, lastName, contact, email, password } = values;
      const role = "G"; // default role
      const res = await register({
        firstName,
        lastName,
        contact,
        email,
        password,
        role,
      });

      if (res.data.error === "User already exists.") {
        showErrorToast("An account with this email/contact already exists");
        return;
      }
      if (res.data.success === "User registered successfully.") {
        showSuccessToast("Sign up successful");
        navigate("/login");
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
          <FormComponent
            title="Register"
            initialValues={{
              firstName: "",
              lastName: "",
              contact: "",
              email: "",
              password: "",
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
          body={<CustomerTermsAndConditions />}
        />
      )}
    </>
  );
};
