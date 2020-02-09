import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { startCase } from 'lodash';

const FormGroup = ({ name, label, ...props }) => (
    <div className="form-group">
        <label htmlFor={name} >{ label || startCase(name) }</label>
        <Field name={name} {...props} />
        <ErrorMessage name={name} component="div" className="text-danger"/>
    </div>
);

export default FormGroup;
