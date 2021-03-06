import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { TextField, DateTimeField, DropdownField } from "./fields";
import { jobTaskSchema } from "./schemas";

const initialValues = {
  description: "",
  end: undefined,
  jobId: undefined,
  resources: [],
  start: undefined,
  workers: [],
};

const JobTaskForm = ({
  values,
  handleSubmit,
  handleCancel,
  jobOptions = [],
  resourceOptions = [],
  workerOptions = [],
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={jobTaskSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
          {(!values || !values.jobId) && (
            <DropdownField label="Job" name="jobId" options={jobOptions} />
          )}
          <TextField label="Description" name="description" />
          <Form.Group>
            <DateTimeField label="Start" name="start" />
            <DateTimeField label="End" name="end" />
          </Form.Group>
          <DropdownField
            label="Staff"
            name="workers"
            options={workerOptions}
            multiple
            clearable
          />
          <DropdownField
            label="Plant"
            name="resources"
            options={resourceOptions}
            multiple
            clearable
          />
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save task"
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

export default JobTaskForm;
