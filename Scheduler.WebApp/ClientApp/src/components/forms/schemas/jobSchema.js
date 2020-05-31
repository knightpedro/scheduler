import * as yup from "yup";
import moment from "moment";

export default yup.object({
  coordinatorId: yup.number(),
  dateReceived: yup.date().required("Date received is required"),
  dateScheduled: yup
    .date()
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
  jobNumber: yup.string().required("Job number is required").max(10),
  location: yup.string().required("Location is required").max(50),
});
