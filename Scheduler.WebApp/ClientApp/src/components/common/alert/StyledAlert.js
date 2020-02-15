import React from "react";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Styles = styled.div`
    background-color: ${props => props.theme.colours.error};
    color: ${props => props.theme.colours.onError};
    font-weight: 500;
`;

const StyledAlert = ({ children }) => (
    <Styles>
        <Alert className="d-flex justify-content-between">
            {children}
            <FontAwesomeIcon size="lg" icon={faExclamationCircle} />
        </Alert>
    </Styles>
);

export default StyledAlert;
