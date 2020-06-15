import React from "react";
import styled from "styled-components";
import Event from "./Event";
import moment from "moment";
import { Link } from "react-router-dom";

const Row = styled.div`
  position: relative;
  border: solid rgba(34, 36, 38, 0.1);
  border-width: 1px 1px 0 0;

  :last-child {
    border-width: 1px 1px 1px 0;
  }
`;

const Cells = styled.div`
  position: absolute;
  display: flex;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const Cell = styled.div`
  flex: 1;
  border-left: 1px solid rgba(34, 36, 38, 0.1);
`;

const Header = styled.div`
  align-self: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 0.8em;
  grid-row: 1/-1;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-template-rows: repeat(2, 50px) repeat(10, auto);
  grid-auto-flow: dense;
  padding: 0.25em 0;
`;

const ScheduleRow = ({ start, end, schedule, header, path }) => {
  const days = end.diff(start, "days") + 1;
  const cells = header ? days + 1 : days;
  const events =
    schedule &&
    schedule.reduce((events, appointment) => {
      const starts = appointment.start.diff(start) > 0;
      const ends = appointment.end.diff(end) < 0;
      const startDiff = appointment.start.diff(start, "days");
      const startSpan = moment
        .max(start, appointment.start)
        .clone()
        .startOf("day");
      const daySpan = Math.min(
        days,
        appointment.end.diff(startSpan, "day") + 1
      );
      events.push(
        <Event
          header={header ? true : false}
          key={`${appointment.id}-${appointment.type}-${start.format()}`}
          appointment={appointment}
          starts={starts}
          ends={ends}
          startDay={startDiff < 0 ? 1 : startDiff + 1}
          daySpan={daySpan}
        />
      );
      return events;
    }, []);
  return (
    <Row>
      <Cells>
        {Array(cells)
          .fill()
          .map((_, i) => (
            <Cell key={i} />
          ))}
      </Cells>
      <EventsGrid columns={cells}>
        {header && (
          <Header>
            <Link to={path}>{header}</Link>
          </Header>
        )}
        {events}
      </EventsGrid>
    </Row>
  );
};

export default ScheduleRow;
