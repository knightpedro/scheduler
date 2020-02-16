import styled from "styled-components";
import { Table } from "../tables";

const Schedule = styled(Table)`
    thead tr {
        text-align: center;
    }

    td {
        background: none;
        height: 60px;
        max-width: 220px;
        min-width: 150px;
    }

    col.weekend {
        background: #f6f6f6;
    }
`;

export default Schedule;
