import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Maximum length is 50"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  isActive: yup.bool(),
});
