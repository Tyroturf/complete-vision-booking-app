import React from "react";
import UploadFile from "./UploadFile";

const UploadDL = ({ handleSubmit }) => {
  return (
    <UploadFile
      fieldName="driverLicense"
      label="Driver's License"
      handleSubmit={handleSubmit}
    />
  );
};

export default UploadDL;
