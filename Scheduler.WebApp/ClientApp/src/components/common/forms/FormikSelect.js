import React from 'react';
import Select from 'react-select';

const FormikSelect = ({ field, form, options, ...props}) => {

    const handleChange = (items) => {
        form.setFieldValue(field.name, items);
    }

    const handleBlur = () => form.setFieldTouched(field.name);

    return (
        <Select value={field.value} options={options} onChange={handleChange} onBlur={handleBlur} {...props} />
    );
};

export default FormikSelect;