import { isValidEmail } from "../../../shared/utils/isValidEmail";
import type { LoginErrors, RegisterErrors } from "./types";

export const validateLoginFields = (email: string, password: string) => {
  const nextErrors: LoginErrors = {};

  if (!email) {
    nextErrors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    nextErrors.email = "Please enter a valid email";
  }

  if (!password) {
    nextErrors.password = "Password is required";
  }

  return nextErrors;
};

export const validateRegisterFields = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const nextErrors: RegisterErrors = {};

  if (!firstName.trim()) {
    nextErrors.firstName = "First name is required";
  } else if (!/^[A-Za-z]+$/.test(firstName.trim())) {
    nextErrors.firstName = "First name should contain only letters";
  }

  if (!lastName.trim()) {
    nextErrors.lastName = "Last name is required";
  } else if (!/^[A-Za-z]+$/.test(lastName.trim())) {
    nextErrors.lastName = "Last name should contain only letters";
  }

  if (!email) {
    nextErrors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    nextErrors.email = "Please enter a valid email";
  }

  if (!password) {
    nextErrors.password = "Password is required";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password)
  ) {
    nextErrors.password =
      "Password must include uppercase, lowercase, number, and special character";
  }

  if (!confirmPassword) {
    nextErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    nextErrors.confirmPassword = "Passwords do not match";
  }

  return nextErrors;
};
