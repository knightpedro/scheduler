import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CreateLink = styled(Link)`
    padding: 7px 15px;
    border-radius: 5px;
    background: ${props => props.theme.colours.secondary};
    color: ${props => props.theme.colours.onSecondary};
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

    :hover,
    :focus {
        text-decoration: none;
        color: ${props => props.theme.colours.onSecondary};
        opacity: 80%;
    }
`;

const Create = ({ children, path }) => (
    <CreateLink to={path} className="shadow-sm">
        {`Add ${children}`}
    </CreateLink>
);

export default Create;
