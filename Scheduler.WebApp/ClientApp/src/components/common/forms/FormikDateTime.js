// From https://github.com/YouCanBookMe/react-datetime/issues/598
import React from 'react';
import Datetime from 'react-datetime';

import './FormikDateTime.css';

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;

const INPUT_CLASSES = "datetime-input form-control ";

const FormikDateTime = ({ field, form, ...props}) => {

    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };
    
    const handleBlur = () => {
        form.setFieldTouched(field.name, true);
    };
  
    return (
        <Datetime
            inputProps={{
                className: INPUT_CLASSES,
                id: field.id,
                name: field.name,
                autoComplete: "off",
                readOnly: true
            }}
            value={form.values[field.name]}
            dateFormat={DATE_FORMAT}
            timeFormat={TIME_FORMAT}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props} 
            />
    );
};

export default FormikDateTime;