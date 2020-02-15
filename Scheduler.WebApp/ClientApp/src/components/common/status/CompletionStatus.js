import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const CompleteWrapper = styled.div`
    font-weight: bold;
    color: ${props => props.theme.colours.success};
`;

const IncompleteWrapper = styled(CompleteWrapper)`
    color: ${props => props.theme.colours.progress};
`;

const Complete = ({ showLabel }) => (
    <CompleteWrapper>
        <FontAwesomeIcon icon={faCheck} fixedWidth />
        {showLabel && "Complete"}
    </CompleteWrapper>
);

const Incomplete = ({ showLabel }) => (
    <IncompleteWrapper>
        <FontAwesomeIcon icon={faSyncAlt} fixedWidth />
        {showLabel && "Ongoing"}
    </IncompleteWrapper>
);

const CompletionStatus = ({ isComplete, showLabel }) => {
    if (isComplete) return <Complete showLabel={showLabel} />;
    return <Incomplete showLabel={showLabel} />;
};

export default CompletionStatus;
