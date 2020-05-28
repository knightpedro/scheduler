import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { DayPickerRangeController } from "react-dates";
import { START_DATE } from "react-dates/constants";
import styled from "styled-components";

const WEEK_FORMAT = "isoWeek";

const Styles = styled.div`
  display: inline;

  .calendar {
    position: absolute;
    padding: 1px;
    z-index: 1;

    table {
      margin-top: 5px;
    }
  }
`;

const WeekPicker = ({ start, end, handleDateChange }) => {
  const [focusedInput, setFocusedInput] = useState(START_DATE);
  const [showCalendar, setShowCalendar] = useState(false);

  const onDateChange = ({ startDate, endDate }) =>
    handleDateChange(startDate, endDate);

  const onFocusChange = (input) => {
    setFocusedInput(!input ? START_DATE : input);
  };

  const onOutsideCalendarClick = (e) => {
    setShowCalendar(false);
  };

  return (
    <Styles>
      <Button basic onClick={() => setShowCalendar(true)}>
        {start.format("Do MMM")} - {end.format("Do MMM YYYY")}
      </Button>

      {showCalendar && (
        <Segment className="calendar" compact>
          <DayPickerRangeController
            noBorder
            hideKeyboardShortcutsPanel
            firstDayOfWeek={1}
            startDateOffset={(date) => date.startOf(WEEK_FORMAT)}
            endDateOffset={(date) => date.endOf(WEEK_FORMAT)}
            startDate={start}
            endDate={end}
            numberOfMonths={1}
            focusedInput={focusedInput}
            onDatesChange={onDateChange}
            onFocusChange={onFocusChange}
            initialVisibleMonth={() => start}
            onOutsideClick={onOutsideCalendarClick}
          />
        </Segment>
      )}
    </Styles>
  );
};

export default WeekPicker;
