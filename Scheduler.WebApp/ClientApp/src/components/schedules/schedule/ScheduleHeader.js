import React from "react";
import styled from "styled-components";
import moment from "moment";
import { getDatesBetween } from "../../../utils/appointments";

const DAY_FORMAT = "ddd";
const DATE_FORMAT = "D";

const Header = styled.div`
  display: flex;

  > div {
    flex: 1;
  }

  > div:first-child {
    border-top-left-radius: 0.3em;
  }

  > div:last-child {
    border-width: 1px 1px 0 1px;
    border-top-right-radius: 0.3em;
  }
`;

const EmptyCell = styled.div`
  border: solid rgba(34, 36, 38, 0.1);
  border-width: 1px 0 0 1px;
  background: #f9fafb;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ today }) => (today ? "#00b5ad" : "#1b1c1d")};
  border: solid rgba(34, 36, 38, 0.1);
  border-width: 1px 0 0 1px;
  background: #f9fafb;
  padding: 0.5em 0;

  .display-date {
    font-size: 24px;
    font-weight: 400;
    margin: 0.2em 0;
  }
`;

const ScheduleHeader = ({ start, end, includeEmptyCell }) => {
  const days = getDatesBetween(start, end);
  return (
    <Header>
      {includeEmptyCell && <EmptyCell />}
      {days.map((day, i) => (
        <Day key={i} className="day" today={moment().isSame(day, "day")}>
          <div className="display-day">{day.format(DAY_FORMAT)}</div>
          <div className="display-date">{day.format(DATE_FORMAT)}</div>
        </Day>
      ))}
    </Header>
  );
};

export default ScheduleHeader;
