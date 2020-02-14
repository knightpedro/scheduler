import React from "react";
import { BaseForm, FormGroup } from "../../common/forms";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .label("Name")
        .max(50)
        .required(),
    email: yup
        .string()
        .label("Email")
        .email("Invalid email")
        .required(),
});

const initialValues = {
    name: "",
    email: "",
};

const CreateCoordinatorForm = ({ handleSubmit, handleCancel }) => {
    return (
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
            <FormGroup
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
            />
        </BaseForm>
    );
};

export default CreateCoordinatorForm;
