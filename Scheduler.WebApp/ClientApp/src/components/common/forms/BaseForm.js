import React from 'react';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';

const BaseForm = ({ initialValues, validationSchema, onSubmit, onCancel, ...props }) => {
    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            onCancel={onCancel}
        >
            {({ isSubmitting }) => (
                <Form>
                    {props.children}
                    <Button type="submit" className="mr-2" disabled={isSubmitting} variant="primary">Save</Button>
                    <Button variant="danger" onClick={onCancel}>Cancel</Button>
                </Form>
            )}
        </Formik>
    );
};

export default BaseForm