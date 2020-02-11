import React, { useState, useMemo } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TITLE_FORMAT = "D MMM YYYY";
const WEEK_FORMAT = "isoWeek";

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  div.left {
    display: flex;
    flex: 1 1 0;
    justify-content: flex-end;
  }

  div.middle {
    display: flex;
    flex: 0 1 auto;
    justify-content: center;
  }

  div.right {
    display: flex;
    flex: 1 1 0;
    justify-content: space-between;
  }
`;

const NavigationHeading = styled.div`
  vertical-align: middle;
  font-weight: bold;
  font-size: 20px;
  white-space: nowrap;
`;

const NavigationButton = styled.button`
  margin: 0 50px;
  background: none;
  border: none;
  color: ${props => props.theme.colours.tableHeadingItem};

  :focus {
    outline: none;
  }

  :hover {
    color: ${props => props.theme.colours.tableHeadingItemHover};
  }
`;

const TodayButton = styled.button`
  background: none;
  border: 1px solid;
  border-color: ${props => props.theme.colours.tableHeadingItem};
  border-radius: 4px;
  color: ${props => props.theme.colours.tableHeadingItem};

  :hover {
    color: ${props => props.theme.colours.tableHeadingItemHover};
    border-color: ${props => props.theme.colours.tableHeadingItemHover};
  }

  :focus {
    outline: none;
  }
`;

const WeekPickerDatetime = styled(Datetime)`
  width: fit-content;
  position: absolute;

  button {
    margin: 0px;
  }

  .rdtPicker {
    padding: 0;
    margin: 0;
    border: none;

    thead tr:first-child th:hover {
      background: ${props => props.theme.colours.datePickerHeadingHover};
      color: ${props => props.theme.colours.datePickerHeadingItemHover};
    }
  }

  thead tr {
    background: ${props => props.theme.colours.datePickerHeading};
    color: ${props => props.theme.colours.datePickerHeadingItem};
  }

  td {
    background: white;
    color: black;
    height: 0;
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
  onReset
}) => (
  <ControlsWrapper>
    <div className="left">
      <WeekPickerDatetime
        value={start}
        closeOnSelect={true}
        timeFormat={false}
        renderInput={renderCalendar}
        onChange={onDateChange}
      />
    </div>
    <div className="middle">
      <NavigationButton title="Previous week" onClick={onPreviousWeek}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </NavigationButton>
      <NavigationHeading>
        {"Week of " + start.format(TITLE_FORMAT)}
      </NavigationHeading>
      <NavigationButton title="Next week" onClick={onNextWeek}>
        <FontAwesomeIcon icon={faChevronRight} />
      </NavigationButton>
    </div>
    <div className="right">
      <TodayButton variant="outline-secondary" onClick={onReset}>
        Now
      </TodayButton>
    </div>
  </ControlsWrapper>
);
