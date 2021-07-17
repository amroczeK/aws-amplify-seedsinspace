import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { endOfToday } from "date-fns";

const tomorrow = endOfToday();

const common = {
  email: yup.string().email("Must be a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
};

const signUpSchema = yup.object().shape({
  organisation: yup.string().required("Organisation name is required"),
  email: common.email,
  password: common.password,
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const signUpResolver = yupResolver(signUpSchema);

const signInSchema = yup.object().shape({
  email: common.email,
  password: common.password,
});

export const signInResolver = yupResolver(signInSchema);

const seedSetUpSchema = yup.object().shape({
  date: yup
    .date()
    .max(tomorrow, "Date cannot be in the future")
    .required("Planting Date required"),
  environment: yup.string().required("Environment details requied"),
});

export const seedSetupResolver = yupResolver(seedSetUpSchema);

const changePasswordSchema = yup.object().shape({
  oldPassword: common.password,
  newPassword: common.password,
  confirmNewPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const changePasswordResolver = yupResolver(changePasswordSchema);
