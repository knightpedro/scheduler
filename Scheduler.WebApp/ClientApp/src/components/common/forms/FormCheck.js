import React from 'react';
import { Field } from 'formik';
import { startCase } from 'lodash';

const FormCheck = ({ name, label, ...props }) => (
    <div className="form-group form-check">
        <Field name={name} type="checkbox" className="form-check-input" {...props} />
        <label htmlFor={name} className="form-check-label">{ label || startCase(name) }</label>
    </div>
);

export default FormCheck;