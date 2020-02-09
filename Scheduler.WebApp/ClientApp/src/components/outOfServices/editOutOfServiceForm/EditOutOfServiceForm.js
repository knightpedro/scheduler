import React from 'react';
import { isFutureDate } from '../../../utils';
import { FormGroup, FormikDateTime, FormikSelect, BaseForm } from '../../common/forms';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    reason: yup.mixed()
        .label("Reason")
        .required(),
    description: 
        yup.string()
        .label("Description")
        .required()
        .max(120),
    start: yup.mixed()
        .label("Start")
        .required(),
    end: yup.mixed()
        .label("End")
        .required()
        .test('endDateAfterStart', "End must be after start", function(value) {
            return value.isAfter(this.parent.start);
        })
});


const EditOutOfServiceForm = ({ handleSubmit, handleCancel, reasons, outOfService}) => (
    <BaseForm
        initialValues={outOfService}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup name="reason" component={FormikSelect} options={reasons} />
        <FormGroup name="description" className="form-control" />
        <FormGroup name="start" component={FormikDateTime} isValidDate={isFutureDate} />
        <FormGroup name="end" component={FormikDateTime} isValidDate={isFutureDate} />
    </BaseForm>
);


export default EditOutOfServiceForm;