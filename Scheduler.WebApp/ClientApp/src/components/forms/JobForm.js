import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { CheckField, TextField, DateField, DropdownField } from "./fields";
import { jobSchema } from "./schemas";

const initialValues = {
  coordinatorId: undefined,
  dateReceived: undefined,
  dateScheduled: undefined,
  description: "",
  isComplete: false,
  jobNumber: "",
  location: "",
};

const JobForm = ({
  values,
  handleSubmit,
  handleCancel,
  coordinatorOptions = [],
}) => {
  const today = new Date();
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={jobSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
          <TextField label="Job number" name="jobNumber" />
          <TextField label="Description" name="description" />
          <TextField label="Location" name="location" />
          <DropdownField
            label="Coordinator"
            name="coordinatorId"
            options={coordinatorOptions}
          />
          <DateField
            label="Date received"
            name="dateReceived"
            maxDate={today}
          />
          <DateField
            label="Date scheduled"
            name="dateScheduled"
            maxDate={today}
          />
          {values && <CheckField label="Complete" name="isComplete" />}
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save job"
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

export default JobForm;
