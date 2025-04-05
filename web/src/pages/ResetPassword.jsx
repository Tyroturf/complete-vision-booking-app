import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { resetPasswordSchema } from "../utils/schemas";
import { resetPassword } from "../api";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = location.state || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await resetPassword(username, password);

      if (response.data.message === "Password updated successfully.") {
        showSuccessToast("Password reset successful.");
        navigate("/login");
      } else {
        showErrorToast("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      showErrorToast("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="relative mb-4">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                >
                  New Password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="relative mb-4">
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                >
                  Confirm Password
                </label>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="text-xs font-bold w-full p-3 bg-brand text-white rounded-md hover:bg-brand-2xl transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}{" "}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
