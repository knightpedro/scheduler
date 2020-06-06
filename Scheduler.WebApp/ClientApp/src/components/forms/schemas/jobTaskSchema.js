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
  jobId: yup.number().required("Job is required"),
  resources: yup
    .array()
    .test(
      "workers-or-resources-assigned",
      "At least one staff member or plant item must be assigned to the task",
      function (value) {
        const { workers } = this.parent;
        if (workers.length > 0) return true;
        return value.length > 0;
      }
    ),
  start: yup.date().required("Start is required"),
  workers: yup
    .array()
    .test(
      "workers-or-resources-assigned",
      "At least one staff member or plant item must be assigned to the task",
      function (value) {
        const { resources } = this.parent;
        if (resources.length > 0) return true;
        return value.length > 0;
      }
    ),
});
