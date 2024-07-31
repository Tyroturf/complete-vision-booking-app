import React from "react";
import FormComponent from "../forms/RegistrationForm";
import wheel from "../assets/wheel.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be 15 characters or less")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await register(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <FormComponent
          title="Register"
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          buttonText="Register"
          isRegister
        />

        <img
          className="hidden md:block md:w-72 lg:w-80 bg-cover bg-center m-10 rounded-xl"
          src={wheel}
          alt="Registration Image"
        />
      </div>
    </div>
  );
};
