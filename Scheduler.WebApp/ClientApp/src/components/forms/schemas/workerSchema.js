import * as yup from "yup";

export default yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Maximum length is 50"),
  isActive: yup.bool(),
});
