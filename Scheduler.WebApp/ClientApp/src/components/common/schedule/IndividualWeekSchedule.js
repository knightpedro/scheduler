import React from "react";
import { getWeekDays, isWeekend } from "../../../utils";
import Schedule from "./Schedule";
import { renderAppointment } from "./Appointment";
import { WeekPickerControls } from "./weekPicker";
import uuid from "uuid/v4";

const HEADER_FORMAT = "ddd DD";

const IndividualWeekSchedule = props => {
    const { schedule, start } = props;

    const renderHeadings = () => {
        const weekDays = getWeekDays(start);

        let columns = weekDays.map((w, i) => (
            <col key={i} className={isWeekend(w.day()) ? "weekend" : null} />
        ));
        let headings = weekDays.map((d, i) => (
            <th key={i}>{d.format(HEADER_FORMAT)}</th>
        ));

        return (
            <>
                <colgroup>{columns}</colgroup>
                <thead>
                    <tr>{headings}</tr>
                </thead>
            </>
        );
    };

    const renderRow = () => (
        <tr>
            {schedule.map(day => {
                return (
                    <td key={uuid()}>
                        {day.map(appointment => renderAppointment(appointment))}
                    </td>
                );
            })}
        </tr>
    );

    return (
        <div className="shadow mt-4 mb-5">
            <WeekPickerControls {...props} />
            <div className="table-responsive">
                <Schedule>
                    {renderHeadings()}
                    <tbody>{renderRow()}</tbody>
                </Schedule>
            </div>
        </div>
    );
};

export default IndividualWeekSchedule;
