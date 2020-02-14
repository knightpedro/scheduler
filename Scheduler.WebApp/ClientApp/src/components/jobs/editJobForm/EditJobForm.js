import React from "react";
import * as yup from "yup";
import { isPastDate } from "../../../utils";
import {
    FormCheck,
    FormGroup,
    FormikDateTime,
    FormikSelect,
    BaseForm,
} from "../../common/forms";

const validationSchema = yup.object().shape({
    jobNumber: yup
        .string()
        .label("Job number")
        .required()
        .max(10),
    description: yup
        .string()
        .label("Job description")
        .required()
        .max(160),
    location: yup
        .string()
        .label("Location")
        .required()
        .max(30),
    dateReceived: yup
        .mixed()
        .label("Date received")
        .required(),
    coordinator: yup
        .mixed()
        .label("Coordinator")
        .required("Assign a coordinator to the job"),
    isComplete: yup.bool(),
});

const EditJobForm = ({ job, coordinators, handleSubmit, handleCancel }) => {
    return (
        <BaseForm
            initialValues={job}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        >
            <FormGroup name="jobNumber" className="form-control" />
            <FormGroup name="description" className="form-control" />
            <FormGroup name="location" className="form-control" />
            <FormGroup
                name="dateReceived"
                component={FormikDateTime}
                timeFormat={false}
                closeOnSelect={true}
                isValidDate={isPastDate}
            />
            <FormGroup
                name="coordinator"
                component={FormikSelect}
                options={coordinators}
            />
            <FormCheck name="isComplete" label="Complete" />
        </BaseForm>
    );
};

export default EditJobForm;
