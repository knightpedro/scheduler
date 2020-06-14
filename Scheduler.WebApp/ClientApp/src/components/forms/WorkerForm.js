import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { CheckField, TextField } from "./fields";
import { workerSchema } from "./schemas";

const initialValues = {
  name: "",
  isActive: true,
};

const WorkerForm = ({ handleSubmit, handleCancel, values, ...props }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={workerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} {...props}>
          <TextField label="Name" name="name" />
          {values && <CheckField label="Active" name="isActive" />}
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save worker"
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

export default WorkerForm;
