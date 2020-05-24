import React from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

const CheckField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { value, onBlur } = field;
  const error =
    meta.touched && meta.error
      ? { content: meta.error, pointing: "left" }
      : false;

  return (
    <Form.Checkbox
      label={label}
      error={error}
      {...props}
      onBlur={onBlur}
      onChange={(_, { checked }) => helpers.setValue(checked)}
      checked={value || false}
    />
  );
};

export default CheckField;
