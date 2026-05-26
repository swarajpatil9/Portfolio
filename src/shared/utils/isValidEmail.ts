export const isValidEmail = (value: string) =>
  value.includes("@") && value.includes(".");
