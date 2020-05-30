import * as yup from "yup";
import moment from "moment";

export default yup.object({
  end: yup
    .date()
    .required("Leave end is required")
    .test("chronological", "End must be after start", function (value) {
      const { start } = this.parent;
      if (!start || !value) return true;
      return moment(value).isAfter(start);
    }),
  leaveType: yup.string().required("Leave type is required"),
  start: yup.date().required("Leave start is required"),
  workerId: yup.number().required("Staff member is required"),
});
