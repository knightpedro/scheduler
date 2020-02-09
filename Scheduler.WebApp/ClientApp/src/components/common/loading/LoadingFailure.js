import React from 'react';
import Alert from 'react-bootstrap/Alert';

const LoadingFailure = ({ message }) => {
    return <Alert variant="danger">Loading failed: {message}</Alert>;
}

export default LoadingFailure;