import React from "react";
import {
    BaseForm,
    FormGroup,
    FormikSelect,
    FormikDateTime,
} from "../../common/forms";
import { isFutureDate } from "../../../utils";
import moment from "moment";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    description: yup
        .string()
        .label("Task description")
        .required()
        .max(160),
    start: yup
        .mixed()
        .label("Start time")
        .required(),
    end: yup
        .mixed()
        .label("End time")
        .required()
        .test("endDateAfterStart", "End must be after start", function(value) {
            return value.isAfter(this.parent.start);
        }),
    selectedResources: yup
        .array()
        .label("Selected plant")
        .nullable()
        .test(
            "oneOfRequired",
            "You must assign staff and/or plant to the task",
            function(value) {
                return value || this.parent.selectedWorkers;
            }
        ),
    selectedWorkers: yup
        .array()
        .label("Selected staff")
        .nullable()
        .test(
            "oneOfRequired",
            "You must assign staff and/or plant to the task",
            function(value) {
                return value || this.parent.selectedResources;
            }
        ),
});

const initialValues = {
    description: "",
    start: moment()
        .startOf("day")
        .add(8, "hour"),
    end: moment()
        .startOf("day")
        .add(16, "hour"),
    selectedWorkers: null,
    selectedResources: null,
};

const CreateJobTaskForm = ({
    handleSubmit,
    handleCancel,
    workers,
    resources,
    jobTask = null,
}) => {
    return (
        <BaseForm
            initialValues={jobTask || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        >
            <FormGroup name="description" className="form-control" />
            <FormGroup
                name="start"
                component={FormikDateTime}
                isValidDate={isFutureDate}
            />
            <FormGroup
                name="end"
                component={FormikDateTime}
                isValidDate={isFutureDate}
            />
            <FormGroup
                name="selectedWorkers"
                label="Assign Staff"
                component={FormikSelect}
                options={workers}
                isSearchable
                isMulti
                closeMenuOnSelect={false}
            />
            <FormGroup
                name="selectedResources"
                label="Assign Plant"
                component={FormikSelect}
                options={resources}
                isSearchable
                isMulti
                closeMenuOnSelect={false}
            />
        </BaseForm>
    );
};

export default CreateJobTaskForm;
