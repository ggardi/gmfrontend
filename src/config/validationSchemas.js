import * as yup from "yup";

export const aboutYouSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Min 2 characters")
    .max(20, "Max 20 characters")
    .matches(/^[a-zA-Z'-]+$/, "Only letters, apostrophes, and hyphens"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Min 2 characters")
    .max(24, "Max 24 characters")
    .matches(/^[a-zA-Z'-]+$/, "Only letters, apostrophes, and hyphens"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .max(40, "Max 40 characters"),
});
