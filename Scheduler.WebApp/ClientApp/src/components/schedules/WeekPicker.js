import React, { useState } from "react";
import DayPicker from "react-day-picker";
import styled from "styled-components";
import moment from "moment";
import { getWeekDays } from "../../utils/appointments";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";

const Styles = styled.div`
  .DayPicker-Day {
    border-radius: 0;
  }

  .DayPicker-Day--selectedStart.DayPicker-Day--selected {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }

  .DayPicker-Day--selectedEnd.DayPicker-Day--selected {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .DayPicker-Day--selected:not(DayPicker-Day--outside):not(.DayPicker-Day--disabled) {
    background-color: lime;
  }

  .DayPicker-Day--selected.DayPicker-Day--outside:not(.DayPicker-Day--disabled) {
    background-color: lime;
  }

  .DayPicker-Day--hoverRange:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):not(.DayPicker-Day--selected) {
    background: #f2f2f2;
  }
`;

const WeekPicker = ({ selectedDays, ...props }) => {
  const [hoverRange, setHoverRange] = useState();

  const handleDayEnter = (date) => {
    const hoverWeek = getWeekDays(moment(date));
    setHoverRange({ from: hoverWeek[0].toDate(), to: hoverWeek[6].toDate() });
  };

  const handleDayLeave = () => setHoverRange();

  const modifiers = {
    hoverRange,
    hoverStart: hoverRange && hoverRange.from,
    hoverEnd: hoverRange && hoverRange.to,
    selectedStart: selectedDays && selectedDays.from,
    selectedEnd: selectedDays && selectedDays.to,
  };

  return (
    <Styles>
      <SingleDatePicker />
      <DayPicker
        initialMonth={selectedDays && selectedDays.from}
        selectedDays={selectedDays}
        modifiers={modifiers}
        firstDayOfWeek={1}
        showOutsideDays
        onDayMouseEnter={handleDayEnter}
        onDayMouseLeave={handleDayLeave}
        {...props}
      />
    </Styles>
  );
};

export default WeekPicker;
