import React from "react";
import moment from "moment";
import {
    BaseForm,
    FormGroup,
    FormikDateTime,
    FormikSelect,
} from "../../common/forms";
import { isFutureDate } from "../../../utils";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    resource: yup
        .mixed()
        .label("Resource")
        .required(),
    reason: yup
        .mixed()
        .label("Reason")
        .required(),
    description: yup
        .string()
        .label("Description")
        .required()
        .max(120),
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
});

const initialValues = {
    resource: null,
    reason: null,
    description: "",
    start: moment()
        .startOf("day")
        .add(8, "hour"),
    end: moment()
        .startOf("day")
        .add(16, "hour"),
};

const OutOfServiceForm = ({
    handleSubmit,
    handleCancel,
    reasons,
    resourceOptions,
    resource = null,
}) => (
    <BaseForm
        initialValues={{ ...initialValues, resource }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup
            name="resource"
            label="Plant"
            component={FormikSelect}
            options={resourceOptions}
        />
        <FormGroup name="reason" component={FormikSelect} options={reasons} />
        <FormGroup
            name="description"
            className="form-control"
            placeholder="Description"
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
    </BaseForm>
);

export default OutOfServiceForm;
