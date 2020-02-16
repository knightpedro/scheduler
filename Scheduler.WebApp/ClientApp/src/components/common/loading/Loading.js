import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Styles = styled.div`
    color: ${props => props.theme.colours.secondary};
    margin-top: 100px;
`;

const Loading = () => (
    <Styles className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
    </Styles>
);

export default Loading;
