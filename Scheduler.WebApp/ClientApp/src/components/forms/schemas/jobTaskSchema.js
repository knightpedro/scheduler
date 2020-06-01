import * as yup from "yup";
import moment from "moment";

export default yup.object({
  description: yup.string().required("Description is required").max(160),
  end: yup
    .date()
    .required("End is required")
    .test("chronological", "End must be after start", function (value) {
      const { start } = this.parent;
      if (!(start && value)) return true;
      return moment(value).isAfter(moment(start));
    }),
  resourceIds: yup
    .array()
    .test(
      "workers-or-resources-assigned",
      "At least one staff member or plant item must be assigned to the task",
      function (value) {
        const { workerIds } = this.parent;
        if (workerIds.length > 0) return true;
        return value.length > 0;
      }
    ),
  start: yup.date().required("Start is required"),
  workerIds: yup
    .array()
    .test(
      "workers-or-resources-assigned",
      "At least one staff member or plant item must be assigned to the task",
      function (value) {
        const { resourceIds } = this.parent;
        if (resourceIds.length > 0) return true;
        return value.length > 0;
      }
    ),
});
