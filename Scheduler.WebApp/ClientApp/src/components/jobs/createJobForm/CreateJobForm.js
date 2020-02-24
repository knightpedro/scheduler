import React from "react";
import * as yup from "yup";
import { isPastDate } from "../../../utils";
import {
    BaseForm,
    FormGroup,
    FormikDateTime,
    FormikSelect,
} from "../../common/forms";
import moment from "moment";

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
});

const initialValues = {
    jobNumber: "",
    description: "",
    location: "",
    dateReceived: moment(),
    coordinator: null,
};

const CreateJobForm = ({ coordinators, handleSubmit, handleCancel }) => {
    return (
        <BaseForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        >
            <FormGroup
                name="jobNumber"
                className="form-control"
                placeholder="Job number"
            />
            <FormGroup
                name="description"
                className="form-control"
                placeholder="Description"
            />
            <FormGroup
                name="location"
                className="form-control"
                placeholder="Location"
            />
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
        </BaseForm>
    );
};

export default CreateJobForm;
