import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .when("currentPassword", {
      is: (val) => !!val,
      then: (schema) =>
        schema
          .required("New password is required")
          .notOneOf(
            [Yup.ref("currentPassword")],
            "New password must be different from current password"
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  confirmNewPassword: Yup.string().when("newPassword", {
    is: (val) => !!val,
    then: (schema) =>
      schema
        .required("Please confirm your new password")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const paymentValidationSchema = Yup.object().shape({
  p_bank_account_num: Yup.string()
    .matches(/^\d+$/, "Account number must be numeric")
    .min(11, "Must be at least 11 digits")
    .required("Bank account number is required"),
  p_bank_type: Yup.string().required("Bank type is required"),
  p_bank_name: Yup.string().required("Bank name is required"),
});

export const userValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const nonUserValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const updateAccountValidationSchema = Yup.object({
  firstName: Yup.string(),
  lastName: Yup.string(),
  contact: Yup.string()
    .length(10, "Contact must be exactly 10 digits")
    .matches(/^\d{10}$/, "Phone number is not valid"),
  email: Yup.string().email("Invalid email address"),
});
