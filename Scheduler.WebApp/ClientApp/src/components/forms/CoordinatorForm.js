import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { CheckField, TextField } from "./fields";
import { coordinatorSchema } from "./schemas";

const initialValues = {
  name: "",
  email: "",
  isActive: true,
};

const CoordinatorForm = ({ handleSubmit, handleCancel, values, ...props }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={coordinatorSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} {...props}>
          <TextField label="Name" name="name" />
          <TextField label="Email" name="email" type="email" />
          {values && <CheckField label="Active" name="isActive" />}
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save coordinator"
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

export default CoordinatorForm;
