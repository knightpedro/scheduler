import React from "react";
import { getWeekDays, isWeekend } from "../../../utils";
import Schedule from "./Schedule";
import { Link } from "react-router-dom";
import { renderAppointment } from "./Appointment";
import uuid from "uuid/v4";
import { WeekPickerControls } from "./weekPicker";
import styled from "styled-components";

const HEADER_DATE_FORMAT = "ddd D";

const Styles = styled.div`
    .table {
        border-spacing: 0;
        border-collapse: separate;
    }

    td:first-child {
        white-space: nowrap;
        min-width: 0;
    }

    th:first-child,
    td:first-child {
        position: sticky;
        left: 0px;
    }

    &&& td {
        border-top: none;
        border-left: none;
    }

    tbody > tr > td:last-child {
        border-right: none;
    }

    tbody > tr:last-child > td {
        border-bottom: none;
    }
`;

const GroupWeekSchedule = props => {
    const { resources, start } = props;

    const renderHeadings = () => {
        const weekDays = getWeekDays(start);
        let columns = weekDays.map((w, i) => (
            <col key={i} className={isWeekend(w.day()) ? "weekend" : null} />
        ));
        let headings = weekDays.map((d, i) => (
            <th key={i} scope="col">
                {d.format(HEADER_DATE_FORMAT)}
            </th>
        ));

        columns.unshift(<col key={uuid()} />);
        headings.unshift(<th key={uuid()} scope="col" />);

        return (
            <>
                <colgroup>{columns}</colgroup>
                <thead>
                    <tr>{headings}</tr>
                </thead>
            </>
        );
    };

    const renderRows = () => {
        return resources.map(resource => {
            const { id, name, path, schedule } = resource;
            return (
                <tr key={id}>
                    <td>
                        <Link to={path}>{name}</Link>
                    </td>
                    {schedule.map(day => {
                        return (
                            <td key={uuid()}>
                                {day.map(appointment =>
                                    renderAppointment(appointment)
                                )}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    return (
        <div className="shadow mt-4 mb-5">
            <WeekPickerControls {...props} />
            <Styles className="table-responsive">
                <Schedule>
                    {renderHeadings()}
                    <tbody>{renderRows()}</tbody>
                </Schedule>
            </Styles>
        </div>
    );
};

export default GroupWeekSchedule;
