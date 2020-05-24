import React from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? { content: meta.error } : false;
  return (
    <Form.Input
      label={label}
      error={error}
      {...field}
      {...props}
      value={field.value || ""}
    />
  );
};

export default TextField;
