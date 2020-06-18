import React, { useState, useEffect } from "react";
import moment from "moment";
import { Form } from "semantic-ui-react";
import { DayPickerRangeController } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";

const DISPLAY_FORMAT = "D/MM/YYYY";

const periods = {
  last30Days: "Last 30 Days",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  thisQuarter: "This Quarter",
  thisYear: "This Year",
  custom: "Custom Range",
};

const periodOptions = Object.values(periods).map((period) => ({
  key: period,
  text: period,
  value: period,
}));

const PeriodPicker = ({ onChange }) => {
  const [dateRange, setDateRange] = useState({
    start: moment().subtract(30, "days"),
    end: moment(),
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(periods.last30Days);

  useEffect(() => {
    onChange(dateRange);
  }, [dateRange, onChange]);

  useEffect(() => {
    switch (selectedPeriod) {
      case periods.last30Days:
        setDateRange({
          start: moment().subtract(30, "days"),
          end: moment(),
        });
        break;
      case periods.thisMonth:
        setDateRange({
          start: moment().startOf("month"),
          end: moment(),
        });
        break;
      case periods.lastMonth:
        setDateRange({
          start: moment().subtract(1, "month").startOf("month"),
          end: moment().subtract(1, "month").endOf("month"),
        });
        break;
      case periods.thisQuarter:
        setDateRange({
          start: moment().startOf("quarter"),
          end: moment(),
        });
        break;
      case periods.thisYear:
        setDateRange({
          start: moment().startOf("year"),
          end: moment(),
        });
        break;
    }
  }, [selectedPeriod]);

  const handlePeriodChange = (_, { value }) => {
    setSelectedPeriod(value);
  };

  const handleStartInputClick = () => {
    setFocusedInput(START_DATE);
  };

  const handleEndInputClick = () => {
    setFocusedInput(END_DATE);
  };

  return (
    <>
      <div className="ui form">
        <Form.Group>
          <Form.Dropdown
            label="Period"
            selection
            value={selectedPeriod}
            onChange={handlePeriodChange}
            options={periodOptions}
          />
          {selectedPeriod === periods.custom && (
            <>
              <Form.Input
                label="From"
                value={
                  dateRange.start ? dateRange.start.format(DISPLAY_FORMAT) : ""
                }
                onClick={handleStartInputClick}
                readOnly
              />
              <Form.Input
                label="To"
                value={
                  dateRange.end ? dateRange.end.format(DISPLAY_FORMAT) : ""
                }
                onClick={handleEndInputClick}
                readOnly
              />
            </>
          )}
        </Form.Group>
      </div>
      {focusedInput && (
        <DayPickerRangeController
          startDate={dateRange.start}
          endDate={dateRange.end}
          onOutsideClick={() => setFocusedInput(null)}
          onDatesChange={({ startDate, endDate }) =>
            setDateRange({ start: startDate, end: endDate })
          }
          numberOfMonths={2}
          hideKeyboardShortcutsPanel
          isOutsideRange={(day) => moment().isBefore(day, "day")}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        />
      )}
    </>
  );
};

export default PeriodPicker;
