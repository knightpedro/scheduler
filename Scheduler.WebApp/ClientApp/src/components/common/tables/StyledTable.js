import styled from "styled-components";
import Table from "react-bootstrap/Table";

const StyledTable = styled(Table)`
    border-collapse: hidden;
    border-style: hidden;
    margin: 0;

    &&& th,
    thead,
    tr,
    td,
    tbody {
        border: none;
        border-spacing: 0;
    }

    thead th {
        background: ${props => props.theme.colours.primaryVariant};
        color: ${props => props.theme.colours.onPrimary};
    }

    tbody td {
        color: ${props => props.theme.colours.onSurface};
        border: 1px solid ${props => props.theme.colours.onSurfaceLight};
    }

    th {
        text-align: center;
    }

    &&& th,
    td {
        vertical-align: middle;
    }

    col {
        background: ${props => props.theme.colours.surface};
    }
`;

export default StyledTable;
