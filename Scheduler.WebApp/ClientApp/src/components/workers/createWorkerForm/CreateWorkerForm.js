import React from "react";
import * as yup from "yup";
import { FormGroup, BaseForm } from "../../common/forms";

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .label("Name")
        .required()
        .max(50),
});

const initialValues = {
    name: "",
};

const CreateWorkerForm = ({ handleSubmit, handleCancel }) => (
    <BaseForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup
            name="name"
            className="form-control"
            placeholder="Full Name"
        />
    </BaseForm>
);

export default CreateWorkerForm;
