import React, { useState } from "react";
import FormComponent from "../forms/RegistrationForm";
import wheel from "../assets/wheel.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import TermsAndConditions from "../components/tncs/TermsAndConditions";
import CustomerTermsAndConditions from "../components/tncs/CustomerTermsAndConditions";
import { registerValidationSchema } from "../utils/schemas";

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
            validationSchema={registerValidationSchema}
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
