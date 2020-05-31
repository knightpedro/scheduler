import React from "react";
import DateField from "./DateField";

const DateTimeField = (props) => (
  <DateField showTimeSelect dateFormat="h:mm a d/M/yy" {...props} />
);

export default DateTimeField;
