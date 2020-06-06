import React, { forwardRef } from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import moment from "moment";

const Styles = styled.div``;

const DateInput = forwardRef((props, ref) => {
  return <Form.Input {...props} />;
});

const DateField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? meta.error : false;
  return (
    <Styles className="field">
      <DatePicker
        {...field}
        todayButton="Today"
        customInput={<DateInput label={label} error={error} />}
        dateFormat="d/M/yy"
        selected={field.value ? field.value.toDate() : ""}
        onChange={(date) => helpers.setValue(moment(date) || "")}
        {...props}
      />
    </Styles>
  );
};

export default DateField;
