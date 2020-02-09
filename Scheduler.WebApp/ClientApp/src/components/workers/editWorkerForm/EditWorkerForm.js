import React from 'react';
import { BaseForm, FormCheck, FormGroup } from '../../common/forms';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    name: yup.string()
        .label("Name")
        .required()
        .max(50),
    isActive: yup.bool()
});

const EditWorkerForm = ({ worker, handleSubmit, handleCancel }) => (
    <BaseForm
        initialValues={worker}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup name="name" className="form-control" placeholder="Full Name"/>
        <FormCheck name="isActive" />
    </BaseForm>
);

export default EditWorkerForm;