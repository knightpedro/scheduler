import styled from "styled-components";
import Table from "react-bootstrap/Table";

const StyledTable = styled(Table)`
    border-collapse: collapse;
    border-style: hidden;
    margin: 0;

    &&& th,
    thead,
    tr,
    td,
    tbody {
        border: none;
    }

    thead tr {
        background: ${props => props.theme.colours.primaryVariant};
        color: ${props => props.theme.colours.onPrimary};
    }

    tbody th {
        background: ${props => props.theme.colours.surface};
        color: ${props => props.theme.colours.onSurface};
    }

    th span {
        margin-right: 5px;
    }

    th {
        text-align: center;
    }

    &&& th,
    td {
        vertical-align: middle;
    }

    td {
        border: 1px solid ${props => props.theme.colours.onSurfaceLight};
        background: ${props => props.theme.colours.surface};
    }

    col {
        background: ${props => props.theme.colours.surface};
    }
`;

export default StyledTable;
