import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "./LinkButton";

const DeleteButton = styled(LinkButton)`
    color: #dc3545;

    &:hover {
        color: darkred;
    }
`;

const Delete = ({ handleClick }) => (
    <DeleteButton onClick={handleClick}>
        <FontAwesomeIcon icon={faTrash} fixedWidth />
        Delete
    </DeleteButton>
);

export default Delete;
