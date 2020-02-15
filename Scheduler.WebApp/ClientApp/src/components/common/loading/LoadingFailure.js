import React from "react";
import Alert from "../alert";

const LoadingFailure = ({ message }) => {
    return <Alert>Loading failed: {message}</Alert>;
};

export default LoadingFailure;
