import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const colors = {
    active: "green",
    inactive: "#dc3545"
};

const ActiveWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${colors.active};
`;

const InactiveWrapper = styled(ActiveWrapper)`
    color: ${colors.inactive};
`;

const Active = () => (
    <ActiveWrapper>
        <FontAwesomeIcon icon={faCheck} color={colors.active} fixedWidth />
        Active
    </ActiveWrapper>
)

const Inactive = () => (
    <InactiveWrapper>
        <FontAwesomeIcon icon={faTimes} color={colors.inactive} fixedWidth />
       Inactive
    </InactiveWrapper>
);

const ActiveStatus = ({ isActive }) => {
    if (isActive) return <Active />
    return <Inactive />
}

export default ActiveStatus;