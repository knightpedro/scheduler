import React, { useState, useMemo } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TITLE_FORMAT = "D MMM YYYY";
const WEEK_FORMAT = "isoWeek";

const ControlsWrapper = styled.div`
    padding-top: 8px;
    background: ${props => props.theme.colours.primaryVariant};
`;

const NavigationHeading = styled.div`
    vertical-align: middle;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    color: ${props => props.theme.colours.onPrimary};
`;

const NavigationButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colours.onPrimary};

    :focus {
        outline: none;
    }

    :hover {
        opacity: 80%;
    }
`;

const TodayButton = styled.button`
    background: none;
    border: 1px solid;
    border-color: ${props => props.theme.colours.onPrimary};
    border-radius: 4px;
    color: ${props => props.theme.colours.onPrimary};

    :hover {
        opacity: 80%;
    }

    :focus {
        outline: none;
    }
`;

const WeekPickerDatetime = styled(Datetime)`
    td.rdtActive {
        background-color: ${props => props.theme.colours.secondary};
        color: ${props => props.theme.colours.onSecondary};
    }
`;

const getStartOfWeek = date => moment(date).startOf(WEEK_FORMAT);

export const useWeekPicker = initialDate => {
    const [start, setStart] = useState(getStartOfWeek(initialDate));
    const end = useMemo(() => start.clone().add(1, "weeks"), [start]);
    const advanceWeek = n => setStart(start.clone().add(n, "weeks"));
    const next = () => advanceWeek(1);
    const previous = () => advanceWeek(-1);
    const reset = () => setStart(getStartOfWeek());
    const setDate = date => setStart(getStartOfWeek(date));
    return [start, end, next, previous, reset, setDate];
};

const renderCalendar = (_, openCalendar) => {
    return (
        <NavigationButton onClick={openCalendar}>
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        </NavigationButton>
    );
};

export const WeekPickerControls = ({
    start,
    onDateChange,
    onPreviousWeek,
    onNextWeek,
    onReset,
}) => (
    <ControlsWrapper className="row no-gutters align-items-center">
        <div className="col-2 d-flex justify-content-start pl-3">
            <WeekPickerDatetime
                value={start}
                closeOnSelect={true}
                timeFormat={false}
                renderInput={renderCalendar}
                onChange={onDateChange}
            />
        </div>
        <div className="col-1 d-flex justify-content-center">
            <NavigationButton title="Previous week" onClick={onPreviousWeek}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </NavigationButton>
        </div>
        <div className="col-6 text-center">
            <NavigationHeading>
                {"Week of " + start.format(TITLE_FORMAT)}
            </NavigationHeading>
        </div>
        <div className="col-1 d-flex justify-content-center">
            <NavigationButton title="Next week" onClick={onNextWeek}>
                <FontAwesomeIcon icon={faChevronRight} />
            </NavigationButton>
        </div>

        <div className="col-2 d-flex justify-content-end pr-3">
            <TodayButton variant="outline-secondary" onClick={onReset}>
                Now
            </TodayButton>
        </div>
    </ControlsWrapper>
);
