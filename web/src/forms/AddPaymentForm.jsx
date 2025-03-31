import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../components/Loader";

const AddPaymentForm = ({ handleSubmit, isLoading }) => {
  const validationSchema = Yup.object().shape({
    p_bank_account_num: Yup.string()
      .matches(/^\d+$/, "Account number must be numeric")
      .min(11, "Must be at least 11 digits")
      .required("Bank account number is required"),
    p_bank_type: Yup.string().required("Bank type is required"),
    p_bank_name: Yup.string().required("Bank name is required"),
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-500">
        Add Bank
      </h3>
      <Formik
        initialValues={{
          p_bank_account_num: "",
          p_bank_type: "",
          p_bank_name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className=" gap-4">
          <div className="relative mb-4">
            <Field
              type="text"
              name="p_bank_account_num"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
              placeholder=" "
            />
            <label
              htmlFor="p_bank_account_num"
              className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px] lg:text-xs"
            >
              Bank Account Number
            </label>
            <ErrorMessage
              name="p_bank_account_num"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="relative mb-4">
            <Field
              type="text"
              name="p_bank_name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
              placeholder=" "
            />
            <label
              htmlFor="p_bank_name"
              className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px] lg:text-xs"
            >
              Bank Name
            </label>
            <ErrorMessage
              name="p_bank_name"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="relative mb-4">
            <Field
              as="select"
              name="p_bank_type"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs"
            >
              <option value="" label="Select bank type" />
              <option value="savings" label="Savings" />
              <option value="current" label="Current" />
            </Field>
            <ErrorMessage
              name="p_bank_type"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-2 px-4 rounded-md mt-4 text-xs font-bold"
          >
            {isLoading ? <Loader /> : "Add Bank Account"}
          </button>
        </Form>
      </Formik>
      <p className="text-xs text-center text-gray-600">
        This is the designated bank where Complete Vision GH will process and
        transfer all your future earnings and payouts.
      </p>
    </div>
  );
};

export default AddPaymentForm;
