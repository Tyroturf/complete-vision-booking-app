import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useReservation } from "../contexts/ReservationContext";
import Loader from "./Loader";

const UploadFile = ({ fieldName, label, handleSubmit, isUploading }) => {
  const { reservationData, setReservationData } = useReservation();

  const validationSchema = Yup.object({
    [fieldName]: Yup.mixed().required(`${label} is required`),
  });

  return (
    <>
      <h3 className="text-lg font-bold mb-4">Upload {label}</h3>
      <Formik
        initialValues={{ [fieldName]: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor={fieldName} className="text-gray-600 text-xs mb-2">
                {label}
              </label>
              <input
                type="file"
                id={fieldName}
                name={fieldName}
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFieldValue(fieldName, file);
                  setReservationData({
                    ...reservationData,
                    [fieldName]: file,
                  });
                }}
                className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
              />
              <ErrorMessage
                name={fieldName}
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2 text-xs">
              <button
                type="submit"
                className="bg-brand text-white px-4 py-2 rounded-md"
              >
                {isUploading ? <Loader /> : "Upload"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadFile;
