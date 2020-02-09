import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const colors = {
    complete: "green",
    incomplete: "darkblue"
};

const CompleteWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${colors.complete};
`;

const IncompleteWrapper = styled(CompleteWrapper)`
    color: ${colors.incomplete};
`;

const Complete = () => (
    <CompleteWrapper>
        <FontAwesomeIcon icon={faCheck} color={colors.complete} fixedWidth />
        Complete
    </CompleteWrapper>
);

const Incomplete = () => (
    <IncompleteWrapper>
        <FontAwesomeIcon icon={faSyncAlt} color={colors.incomplete} fixedWidth />
        Ongoing
    </IncompleteWrapper>
);

const CompletionStatus = ({ isComplete }) => {
    if (isComplete) return <Complete />
    return <Incomplete />
};

export default CompletionStatus;