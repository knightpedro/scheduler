import * as yup from "yup";

export default yup.object({
  description: yup
    .string()
    .required("Description is required")
    .max(50, "Maximum length is 50"),
  name: yup
    .string()
    .required("Name is required")
    .max(30, "Maximum length is 30"),
  isActive: yup.bool(),
});
