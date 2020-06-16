import React from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { DateTimeField, DropdownField, TextField } from "./fields";
import { outOfServiceSchema } from "./schemas";

const initialValues = {
  description: "",
  end: undefined,
  reason: undefined,
  start: undefined,
  resourceId: undefined,
};

const OutOfServiceForm = ({
  values,
  handleSubmit,
  handleCancel,
  outOfServiceTypeOptions = [],
  resourceOptions = [],
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...values }}
      validationSchema={outOfServiceSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          {(!values || !values.resourceId) && (
            <DropdownField
              label="Plant"
              name="resourceId"
              options={resourceOptions}
            />
          )}
          <DropdownField
            label="Reason"
            name="reason"
            options={outOfServiceTypeOptions}
            search={false}
          />
          <TextField label="Description" name="description" />
          <Form.Group>
            <DateTimeField label="From" name="start" />
            <DateTimeField label="To" name="end" />
          </Form.Group>
          <Form.Group>
            <Form.Button
              type="submit"
              content="Save"
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

export default OutOfServiceForm;
