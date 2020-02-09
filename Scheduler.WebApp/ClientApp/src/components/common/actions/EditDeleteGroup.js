import React from 'react';
import styled from 'styled-components';
import Edit from './Edit';
import Delete from './Delete';

const Container = styled.div`
    margin-left: auto;
    align-self: flex-end;
`;

const EditDeleteGroup = ({ editPath, handleDeleteClick }) => (
    <Container>
        <Edit path={editPath} />
        <Delete handleClick={handleDeleteClick} />
    </Container>
);

export default EditDeleteGroup;