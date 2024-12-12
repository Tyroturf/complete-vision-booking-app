import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useReservation } from "../contexts/ReservationContext";

const validationSchema = Yup.object({
  driverLicense: Yup.mixed().required("Driver's License is required"),
  selfie: Yup.mixed().required("Selfie is required"),
});

const UploadSelfie = ({ handleSubmit }) => {
  const { reservationData, setReservationData } = useReservation();

  return (
    <>
      <h3 className="text-lg font-bold mb-4">Upload Selfie</h3>
      <Formik
        initialValues={{ driverLicense: null, selfie: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor="selfie" className="text-gray-600 text-xs mb-2">
                Selfie
              </label>
              <input
                type="file"
                id="selfie"
                name="selfie"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFieldValue("selfie", file);
                  setReservationData({
                    ...reservationData,
                    selfie: file,
                  });
                }}
                className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
              />
              <ErrorMessage
                name="selfie"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2 text-xs">
              <button
                type="submit"
                className="bg-brand text-white px-4 py-2 rounded-md"
              >
                Upload
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadSelfie;
