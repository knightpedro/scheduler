import React from 'react';
import moment from 'moment';
import { isFutureDate } from '../../../utils';
import { FormGroup, FormikDateTime, FormikSelect, BaseForm } from '../../common/forms';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    worker: yup.mixed()
        .label("Staff member")
        .required(),
    leaveType: yup.mixed()
        .label("Leave type")
        .required(),
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

const initialValues = {
    worker: null,
    leaveType: null,
    start: moment().startOf('day').add(8, 'hour'),
    end: moment().startOf('day').add(16, 'hour')
};

const CreateLeaveForm = ({ handleSubmit, handleCancel, leaveTypes, workerOptions, worker = null }) => (
    <BaseForm
        initialValues={{...initialValues, worker}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
    >
        <FormGroup name="worker" component={FormikSelect} options={workerOptions} />
        <FormGroup name="leaveType" component={FormikSelect} options={leaveTypes} />
        <FormGroup name="start" component={FormikDateTime} isValidDate={isFutureDate} />
        <FormGroup name="end" component={FormikDateTime} isValidDate={isFutureDate} />
    </BaseForm>
);

export default CreateLeaveForm;