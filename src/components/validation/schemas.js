import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
