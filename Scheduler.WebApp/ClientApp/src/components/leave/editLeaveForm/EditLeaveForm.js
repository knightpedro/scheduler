import React from "react";
import { isFutureDate } from "../../../utils";
import {
    FormGroup,
    FormikDateTime,
    FormikSelect,
    BaseForm,
} from "../../common/forms";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    leaveType: yup
        .mixed()
        .label("Leave type")
        .required(),
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

const EditLeaveForm = ({ handleSubmit, handleCancel, leaveTypes, leave }) => (
    <BaseForm
        initialValues={leave}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup
            name="leaveType"
            component={FormikSelect}
            options={leaveTypes}
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

export default EditLeaveForm;
