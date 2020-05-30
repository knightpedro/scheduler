import React, { useState } from "react";
import { Button, Segment, Icon } from "semantic-ui-react";
import { DayPickerRangeController } from "react-dates";
import { START_DATE } from "react-dates/constants";
import styled from "styled-components";

const WEEK_FORMAT = "isoWeek";

const Styles = styled.div`
  .calendar {
    position: absolute;
    padding: 1px;
    z-index: 2;
    left: 50%;
    transform: translate(-50%, 0);

    table {
      margin-top: 5px;
    }
  }
`;

const WeekDisplay = styled(Button)`
  &&& {
    font-weight: bold;
    min-width: 230px;
  }
`;

const WeekPicker = ({
  start,
  end,
  handleDateChange,
  handleNext,
  handlePrevious,
}) => {
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
      <Icon
        color="teal"
        name="angle left"
        link
        size="large"
        onClick={handlePrevious}
      />
      <WeekDisplay basic color="teal" onClick={() => setShowCalendar(true)}>
        {start.format("Do MMM")} - {end.format("Do MMM YYYY")}
      </WeekDisplay>
      <Icon
        color="teal"
        name="angle right"
        link
        size="large"
        onClick={handleNext}
      />

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
