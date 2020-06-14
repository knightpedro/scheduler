import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { CheckField, TextField } from "./fields";
import { resourceSchema } from "./schemas";

const initialValues = {
  description: "",
  name: "",
  isActive: true,
};

const ResourceForm = ({ handleSubmit, handleCancel, values, ...props }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={resourceSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} {...props}>
          <TextField label="Name" name="name" />
          <TextField label="Description" name="description" />
          {values && <CheckField label="Active" name="isActive" />}
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save plant"
              primary
              disabled={formik.isSubmitting}
            />
            <Form.Button
              type="button"
              content="Cancel"
              onClick={() => handleCancel()}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default ResourceForm;
