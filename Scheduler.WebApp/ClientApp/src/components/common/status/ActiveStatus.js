import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ActiveWrapper = styled.div`
    font-weight: bold;
    color: ${props => props.theme.colours.success};
`;

const InactiveWrapper = styled(ActiveWrapper)`
    color: ${props => props.theme.colours.error};
`;

const Active = ({ showLabel }) => (
    <ActiveWrapper>
        <FontAwesomeIcon icon={faCheck} fixedWidth />
        {showLabel && "Active"}
    </ActiveWrapper>
);

const Inactive = ({ showLabel }) => (
    <InactiveWrapper>
        <FontAwesomeIcon icon={faTimes} fixedWidth />
        {showLabel && "Inactive"}
    </InactiveWrapper>
);

const ActiveStatus = ({ isActive, showLabel }) => {
    if (isActive) return <Active showLabel={showLabel} />;
    return <Inactive showLabel={showLabel} />;
};

export default ActiveStatus;
