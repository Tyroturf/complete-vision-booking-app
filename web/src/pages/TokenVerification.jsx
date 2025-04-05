import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { verifyToken } from "../api";
import Loader from "../components/Loader";
import { formatTime } from "../utils/helpers";

const TokenVerification = () => {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(900);

  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  useEffect(() => {
    if (token.length === 6 && !isSubmitting && !isError) {
      handleSubmit();
    }
  }, [token, isSubmitting, isError]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsError(false);
    try {
      const q = {
        p_username: username,
        p_reset_code: token,
      };
      const response = await verifyToken(q);
      console.log(response);

      if (response.data === "TRUE") {
        showSuccessToast("Token verified successfully.");
        navigate("/reset-password", { state: { username } });
      } else {
        showErrorToast("Invalid or expired token. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Failed to verify token:", error);
      showErrorToast("An error occurred. Please try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Enter Verification Token
        </h2>
        <p className="text-gray-600 mb-4 text-xs md:text-sm">
          Please enter the 6-digit token sent to your contact.
        </p>

        <form>
          <div className="mb-4 flex flex-col">
            <OtpInput
              value={token}
              onChange={handleTokenChange}
              numInputs={6}
              separator={<span className="mx-2"></span>}
              containerStyle="flex justify-center mb-4"
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 8px",
                    borderRadius: "8px",
                    border: isError ? "1px solid red" : "1px solid #ccc",
                    textAlign: "center",
                    fontSize: "20px",
                    outline: "none",
                  }}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              focusStyle={{
                borderColor: "#4b89dc",
                boxShadow: "0 0 5px rgba(75, 137, 220, 0.8)",
              }}
            />
            <div className="text-center mb-4 text-xs text-gray-600">
              Token expires in{" "}
              <span className="font-semibold">
                {formatTime(secondsRemaining)}
              </span>
            </div>
          </div>

          {isSubmitting && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default TokenVerification;
