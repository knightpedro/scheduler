import React from "react";
import styled from "styled-components";

const Styles = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
`;

const AuthContainer = props => (
    <Styles>
        <div>{props.children}</div>
    </Styles>
);

export default AuthContainer;
