import React, { forwardRef } from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const Styles = styled.div``;

const DateInput = forwardRef((props, ref) => {
  return (
    <Form.Input {...props}>
      <input ref={ref} />
    </Form.Input>
  );
});

const DateField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? { content: meta.error } : false;
  return (
    <Styles className="field">
      <DatePicker
        {...field}
        todayButton="Today"
        customInput={<DateInput label={label} error={error} />}
        dateFormat="d/M/yy"
        selected={field.value || ""}
        onChange={(date) => helpers.setValue(date || "")}
        {...props}
      />
    </Styles>
  );
};

export default DateField;
