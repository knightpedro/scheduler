import React from 'react';
import { BaseForm, FormGroup } from '../../common/forms';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    name: yup.string()
        .label("Name")
        .required()
        .max(30),
    description: yup.string()
        .label("Description")
        .required()
        .max(50)
});

const initialValues = {
    name: '',
    description: ''
};

const CreateResourceForm = ({ handleSubmit, handleCancel }) => (
    <BaseForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup name="name" className="form-control" />
        <FormGroup name="description" className="form-control" />
    </BaseForm>
);

export default CreateResourceForm;