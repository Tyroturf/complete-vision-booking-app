import React from "react";
import UploadFile from "./UploadFile";

const UploadSelfie = ({ handleSubmit }) => {
  return (
    <UploadFile fieldName="selfie" label="Selfie" handleSubmit={handleSubmit} />
  );
};

export default UploadSelfie;
