import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { DateField, DropdownField } from "./fields";
import { leaveSchema } from "./schemas";

const initialValues = {
  end: undefined,
  leaveType: undefined,
  start: undefined,
  workerId: undefined,
};

const LeaveForm = ({
  handleCancel,
  handleSubmit,
  leaveTypeOptions = [],
  workerOptions = [],
  values,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={leaveSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
          <DropdownField
            label="Staff member"
            name="workerId"
            options={workerOptions}
          />
          <DropdownField
            label="Leave type"
            name="leaveType"
            options={leaveTypeOptions}
            search={false}
          />
          <Form.Group>
            <DateField label="From" name="start" />
            <DateField label="To" name="end" />
          </Form.Group>

          <Form.Group>
            <Form.Button
              type="submit"
              content="Save leave"
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

export default LeaveForm;
