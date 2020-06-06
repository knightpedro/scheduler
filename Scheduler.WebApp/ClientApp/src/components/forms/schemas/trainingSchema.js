import * as yup from "yup";
import moment from "moment";

export default yup.object({
  description: yup.string().required("Description is required").max(100),
  location: yup.string().required("Location is required").max(50),
  start: yup.date().required("Start time is required"),
  end: yup
    .date()
    .required("End time is required")
    .test("chronological", "End must be after start time", function (value) {
      const { start } = this.parent;
      if (!(start && value)) return true;
      return moment(value).isAfter(moment(start));
    }),
  workers: yup.array().required("Assign at least one staff member"),
});
