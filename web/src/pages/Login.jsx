import React, { useState } from "react";
import FormComponent from "../forms/RegistrationForm";
import tall from "../assets/tall.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { emailOnlySchema, loginValidationSchema } from "../utils/schemas";
import { forgotPassword } from "../api";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;

      const response = await login(email, password);

      if (response.data.status === "Success") {
        showSuccessToast("Login successful");

        const redirectPath =
          sessionStorage.getItem("redirectAfterLogin") || "/";
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        showErrorToast("Incorrect credentials. Please try again");
      }
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleResetPassword = async (email) => {
    try {
      const res = await forgotPassword(email);
      console.log(res);
      showSuccessToast("Password reset link has been sent to your contact.");
      setIsForgotPassword(false);
      navigate("/token-verification", { state: { username: email } });
    } catch (error) {
      showErrorToast("Failed to send password reset link.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
        {isForgotPassword ? (
          <div className="w-full px-6 py-8">
            <h2 className="text-sm md:text-lg font-semibold text-gray-600 mb-4">
              Forgot Password
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              Please enter your email address. We'll send you a link to reset
              your password.
            </p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailOnlySchema}
              onSubmit={(values) => handleResetPassword(values.email)}
            >
              {({ isSubmitting }) => (
                <Form className="text-xs md:text-sm">
                  <div className="mb-4">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3 bg-brand font-bold text-white rounded-md hover:bg-brand-4xl transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center text-xs md:text-sm">
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-brand hover:underline"
              >
                Back to Login
              </button>
            </div>
          </div>
        ) : (
          <>
            <FormComponent
              title="Login"
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
              buttonText="Login"
              handleForgotPasswordClick={handleForgotPasswordClick}
            />
            <img
              className="hidden md:block md:w-72 lg:w-80 bg-cover bg-center m-10 rounded-xl"
              src={tall}
              alt="Login Image"
            />
          </>
        )}
      </div>
    </div>
  );
};
