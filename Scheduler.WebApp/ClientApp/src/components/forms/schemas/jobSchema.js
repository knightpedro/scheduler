import * as yup from "yup";
import moment from "moment";

export default yup.object({
  coordinatorId: yup.number().nullable(),
  dateReceived: yup.date().nullable().required("Date received is required"),
  dateScheduled: yup
    .date()
    .nullable()
    .test(
      "chronological",
      "Date scheduled can't be before date received",
      function (value) {
        const { dateReceived } = this.parent;
        if (!(dateReceived && value)) return true;
        return moment(value).isSameOrAfter(moment(dateReceived));
      }
    ),
  description: yup.string().required("Description is required").max(160),
  isComplete: yup.bool(),
  jobNumber: yup.string().required("Job number is required").max(10),
  location: yup.string().required("Location is required").max(50),
});
