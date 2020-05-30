import React from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

const DropdownField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? { content: meta.error } : false;

  return (
    <Form.Dropdown
      label={label}
      error={error}
      placeholder="Select"
      selection
      search
      options={options}
      onBlur={() => helpers.setTouched(true)}
      onChange={(_, { value }) => helpers.setValue(value || null)}
      value={field.value}
      {...props}
    />
  );
};

export default DropdownField;
