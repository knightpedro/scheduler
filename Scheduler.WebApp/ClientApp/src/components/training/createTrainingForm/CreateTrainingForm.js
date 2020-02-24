import React from "react";
import { isFutureDate } from "../../../utils";
import {
    FormGroup,
    FormikDateTime,
    FormikSelect,
    BaseForm,
} from "../../common/forms";
import moment from "moment";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    description: yup
        .string()
        .label("Description")
        .required()
        .max(100),
    location: yup
        .string()
        .label("Location")
        .required()
        .max(50),
    start: yup
        .mixed()
        .label("Start")
        .required(),
    end: yup
        .mixed()
        .label("End")
        .required()
        .test("endDateAfterStart", "End must be after start", function(value) {
            return value.isAfter(this.parent.start);
        }),
    selectedWorkers: yup
        .array()
        .nullable()
        .label("Selected staff")
        .required("Assign one or more staff"),
});

const initialValues = {
    description: "",
    location: "",
    start: moment()
        .startOf("day")
        .add(8, "hour"),
    end: moment()
        .startOf("day")
        .add(16, "hour"),
    selectedWorkers: null,
};

const CreateTrainingForm = ({
    handleSubmit,
    handleCancel,
    workers,
    training = null,
}) => (
    <BaseForm
        initialValues={training || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
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
            label="Staff Attending"
            component={FormikSelect}
            options={workers}
            isSearchable
            isMulti
            closeMenuOnSelect={false}
        />
    </BaseForm>
);

export default CreateTrainingForm;
