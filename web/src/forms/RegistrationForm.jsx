import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const FormComponent = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  buttonText,
  isRegister,
}) => {
  const handleGoogleLogin = () => {
    // Placeholder for Google login functionality
    console.log("Google login clicked");
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <Link
        className="text-lg md:text-xl lg:text-2xl font-bold text-center text-brand mb-6"
        to={"/"}
      >
        Complete Vision
      </Link>
      <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-500">
        {title}
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {isRegister && (
              <>
                <div className="relative">
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    First Name
                  </label>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    Last Name
                  </label>
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="text"
                    name="contact"
                    id="contact"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="contact"
                    className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    Contact
                  </label>
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* <div className="relative">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                    placeholder=" "
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    Username
                  </label>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div> */}
              </>
            )}
            <div className="relative">
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Email
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Password
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* {isRegister && (
              <div className="relative">
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm"
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
            )} */}
            <button
              type="submit"
              className="w-full bg-brand text-white py-2 rounded-md font-bold hover:scale-105 transition-transform duration-200 text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? `${buttonText}ing...` : buttonText}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-xs text-center text-gray-500 mt-3">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          to={isRegister ? "/login" : "/register"}
          className="mx-5 text-brand rounded-lg transition"
        >
          {isRegister ? "Login" : "Register"}
        </Link>
      </p>
      <div className="flex flex-col items-center mt-4 w-full">
        <div className="relative w-full flex justify-center items-center">
          <span className="absolute bg-white px-2 text-gray-500 text-xs">
            or
          </span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full bg-[white] border border-gray-300 text-gray-700 py-2 rounded-md flex justify-center items-center hover:bg-gray-100 transition text-xs"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
