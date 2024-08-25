import React from "react";
import FormComponent from "../forms/RegistrationForm";
import tall from "../assets/tall.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;

      const response = await login(email, password);
      console.log(response);

      if (response.data.status === "Success") {
        navigate("/");
        showSuccessToast("Login successful");
      } else {
        console.error("Failed to log in: Invalid credentials or response");
        showErrorToast("Failed to login. Please try again");
      }
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
        <FormComponent
          title="Login"
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          buttonText="Login"
        />

        <img
          className="hidden md:block md:w-72 lg:w-80 bg-cover bg-center m-10 rounded-xl"
          src={tall}
          alt="Login Image"
        />
      </div>
    </div>
  );
};
