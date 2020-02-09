import React from 'react';
import * as yup from 'yup';
import { BaseForm, FormCheck, FormGroup } from '../../common/forms';

const validationSchema = yup.object().shape({
    name: yup.string()
        .label("Name")
        .max(50)
        .required(),
    email: yup.string()
        .label("Email")
        .email("Invalid email")
        .required(),
    isActive: yup.bool()
});

const EditCoordinatorForm = ({ coordinator, handleCancel, handleSubmit }) => {
    return (
        <BaseForm
            initialValues={coordinator}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        >
            <FormGroup name="name" className="form-control" placeholder="Full Name" />
            <FormGroup name="email" type="email" className="form-control" placeholder="Email" />
            <FormCheck name="isActive" label="Is active" />
        </BaseForm>
    )
};

export default EditCoordinatorForm;