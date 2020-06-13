import * as yup from "yup";
import moment from "moment";

export default yup.object({
  description: yup
    .string()
    .nullable()
    .required("Description is required")
    .max(120),
  end: yup
    .date()
    .required("End is required")
    .test("chronological", "End must be after start", function (value) {
      const { start } = this.parent;
      if (!(start && value)) return true;
      return moment(value).isAfter(moment(start));
    }),
  start: yup.date().required("Start is required"),
  reason: yup.string().required("Reason is required"),
  resourceId: yup.number().nullable().required("Plant item is required"),
});
