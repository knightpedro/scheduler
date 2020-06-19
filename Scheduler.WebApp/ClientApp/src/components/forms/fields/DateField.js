import React, { forwardRef } from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import moment from "moment";

const Styles = styled.div`
  .react-datepicker__month-container {
    z-index: 1;
  }
  .react-datepicker__time-container {
    right: -80px;
  }
`;

const DateInput = forwardRef((props, ref) => {
  return <Form.Input {...props} icon="calendar" />;
});

const DateField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? meta.error : false;
  return (
    <Styles className="field">
      <DatePicker
        {...field}
        customInput={<DateInput label={label} error={error} />}
        dateFormat="d/M/yy"
        selected={field.value ? field.value.toDate() : ""}
        onChange={(date) => (date ? helpers.setValue(moment(date)) : "")}
        {...props}
      />
    </Styles>
  );
};

export default DateField;
