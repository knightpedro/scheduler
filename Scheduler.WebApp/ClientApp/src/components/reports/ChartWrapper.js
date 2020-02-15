import styled from "styled-components";

const ChartWrapper = styled.div`
    text-transform: capitalize;

    .bar {
        fill: ${props => props.theme.colours.primaryVariant};
    }

    .total {
        font-size: 24px;
        text-transform: none;
    }
`;

export default ChartWrapper;
