import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { DateTimeField, DropdownField, TextField } from "./fields";
import { trainingSchema } from "./schemas";

const initialValues = {
  description: "",
  end: undefined,
  location: "",
  start: undefined,
  workers: [],
};

const TrainingForm = ({
  values,
  handleSubmit,
  handleCancel,
  workerOptions = [],
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={trainingSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField label="Description" name="description" />
          <TextField label="Location" name="location" />
          <Form.Group>
            <DateTimeField label="From" name="start" />
            <DateTimeField label="To" name="end" />
          </Form.Group>
          <DropdownField
            label="Staff attending"
            name="workerIds"
            options={workerOptions}
            multiple
          />
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save training"
              primary
              disabled={formik.isSubmitting}
            />
            <Form.Button
              type="button"
              content="Cancel"
              onClick={handleCancel}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default TrainingForm;
