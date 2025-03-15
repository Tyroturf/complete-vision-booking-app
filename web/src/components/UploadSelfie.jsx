import React from "react";
import UploadFile from "./UploadFile";

const UploadSelfie = ({ handleSubmit, isUploading }) => {
  return (
    <UploadFile
      fieldName="selfie"
      label="Selfie"
      handleSubmit={handleSubmit}
      isUploading={isUploading}
    />
  );
};

export default UploadSelfie;
