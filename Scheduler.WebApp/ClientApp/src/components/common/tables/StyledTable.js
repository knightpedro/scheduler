import styled from "styled-components";
import Table from "react-bootstrap/Table";

const StyledTable = styled(Table)`
  table-layout: fixed;
  border-collapse: collapse;
  border-style: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin: 20px 0 50px 0;

  &&& th,
  thead,
  tr,
  td,
  tbody {
    border: none;
  }

  thead tr {
    background: ${props => props.theme.colours.tableHead};
    color: ${props => props.theme.colours.tableHeadingItem};
  }

  tbody th {
    background: ${props => props.theme.colours.tableHeading};
    color: ${props => props.theme.colours.tableHeadingItem};
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
    border: 1px solid ${props => props.theme.colours.tableBorder};
    background: ${props => props.theme.colours.tableBody};
  }

  col {
    background: ${props => props.theme.colours.tableBody};
  }
`;

export default StyledTable;
