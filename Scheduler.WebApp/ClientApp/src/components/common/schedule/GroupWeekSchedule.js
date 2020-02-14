import React from "react";
import { getWeekDays, isWeekend } from "../../../utils";
import Schedule from "./Schedule";
import { Link } from "react-router-dom";
import { renderAppointment } from "./Appointment";
import uuid from "uuid/v4";
import { WeekPickerControls } from "./weekPicker";

const HEADER_DATE_FORMAT = "ddd D";

const GroupWeekSchedule = props => {
    const { resources, start } = props;

    const renderHeadings = () => {
        const weekDays = getWeekDays(start);
        let columns = weekDays.map((w, i) => (
            <col key={i} className={isWeekend(w.day()) ? "weekend" : null} />
        ));
        let headings = weekDays.map((d, i) => (
            <th key={i}>{d.format(HEADER_DATE_FORMAT)}</th>
        ));

        columns.unshift(<col key={uuid()} />);
        headings.unshift(<th key={uuid()} />);

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
            <div className="table-responsive">
                <Schedule>
                    {renderHeadings()}
                    <tbody>{renderRows()}</tbody>
                </Schedule>
            </div>
        </div>
    );
};

export default GroupWeekSchedule;
