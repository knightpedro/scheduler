import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateLink = styled(Link)`
    border: 1px solid lightgray;
    padding: 5px 10px;
    border-radius: 10px;
    background: white;
    text-transform: uppercase;
    font-size: 14px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const Create = ({ children, path }) => (
    <CreateLink to={path} className="shadow-sm">
        <FontAwesomeIcon icon={faPlus} fixedWidth />
        {children}
    </CreateLink>
);

export default Create;
