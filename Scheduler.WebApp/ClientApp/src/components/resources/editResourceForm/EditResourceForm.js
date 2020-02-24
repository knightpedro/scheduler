import React from "react";
import { BaseForm, FormCheck, FormGroup } from "../../common/forms";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .label("Name")
        .required()
        .max(30),
    description: yup
        .string()
        .label("Description")
        .required()
        .max(50),
    isActive: yup.bool(),
});

const EditResourceForm = ({ handleSubmit, handleCancel, resource }) => (
    <BaseForm
        initialValues={resource}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup name="name" className="form-control" placeholder="Name" />
        <FormGroup
            name="description"
            className="form-control"
            placeholder="Description"
        />
        <FormCheck name="isActive" />
    </BaseForm>
);

export default EditResourceForm;
