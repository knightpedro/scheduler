import styled from "styled-components";
import { Table } from "../tables";

const Schedule = styled(Table)`
  thead tr {
    text-align: center;
  }

  tr th {
    width: 12.5%;
  }

  td {
    background: none;
    height: 60px;
  }

  col.weekend {
    background: #f6f6f6;
  }
`;

export default Schedule;
