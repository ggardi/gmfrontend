import * as yup from "yup";
import { validationMessages } from "./validationMessages";

export const aboutYouSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(validationMessages.firstNameRequired)
    .min(2, validationMessages.min2)
    .max(20, validationMessages.max20)
    .matches(/^[a-zA-Z'-]+$/, validationMessages.onlyLetters),
  lastName: yup
    .string()
    .required(validationMessages.lastNameRequired)
    .min(2, validationMessages.min2)
    .max(24, validationMessages.max24)
    .matches(/^[a-zA-Z'-]+$/, validationMessages.onlyLetters),
  email: yup
    .string()
    .required(validationMessages.emailRequired)
    .email(validationMessages.emailInvalid)
    .max(40, validationMessages.max40),
});

export const loanOfficerSchema = yup
  .object()
  .shape({
    officerId: yup.string(),
    branchId: yup.string(),
  })
  .test(
    "one-required",
    validationMessages.oneOfficerOrBranchRequired,
    (obj) => !!(obj.officerId || obj.branchId)
  );

export const loanTypeSchema = yup.object().shape({
  loanType: yup.string().required(validationMessages.loanTypeRequired),
});

export const propertyStateSchema = yup.object().shape({
  propertyState: yup
    .string()
    .required(validationMessages.propertyStateRequired),
});
