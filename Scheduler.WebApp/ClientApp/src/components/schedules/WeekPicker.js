import React, { useState } from "react";
import moment from "moment";
import { DayPickerRangeController } from "react-dates";
import { START_DATE } from "react-dates/constants";

const WeekPicker = ({ start, end, handleDateChange }) => {
  const [focusedInput, setFocusedInput] = useState(START_DATE);

  const onDateChange = ({ startDate, endDate }) =>
    handleDateChange(startDate, endDate);

  const onFocusChange = (input) => {
    setFocusedInput(!input ? START_DATE : input);
  };

  return (
    <DayPickerRangeController
      startDateOffset={(date) => date.startOf("isoWeek")}
      endDateOffset={(date) => date.endOf("isoWeek")}
      startDate={start}
      endDate={end}
      enableOutsideDays
      numberOfMonths={1}
      focusedInput={focusedInput}
      onDatesChange={onDateChange}
      onFocusChange={onFocusChange}
      initialVisibleMonth={() => moment()}
    />
  );
};

export default WeekPicker;
