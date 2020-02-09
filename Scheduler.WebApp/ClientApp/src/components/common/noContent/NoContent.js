import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-top: 20px;
`;

const NoContent = ({ item }) => (
    <Wrapper>
        {`No ${item} to show.`}
    </Wrapper>
);

export default NoContent;