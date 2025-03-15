import React from "react";
import UploadFile from "./UploadFile";

const UploadDL = ({ handleSubmit, isUploading }) => {
  return (
    <UploadFile
      fieldName="driverLicense"
      label="Driver's License"
      handleSubmit={handleSubmit}
      isUploading={isUploading}
    />
  );
};

export default UploadDL;
