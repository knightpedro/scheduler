import styled from 'styled-components';
import { Table } from '../tables';

const Schedule = styled(Table)`
    thead tr {
        text-align: center;
    }

    td {
        background: none;
        height: 70px;
    }

    col.weekend {
        background: #F6F6F6;
    }
`;

export default Schedule;