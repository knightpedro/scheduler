import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EditLink = styled(Link)`
    margin-right: 2px;
`;

const Edit = ({ path }) => (
    <EditLink to={path}>
        <i><FontAwesomeIcon icon={faEdit} fixedWidth /></i>
        Edit
    </EditLink>
);

export default Edit