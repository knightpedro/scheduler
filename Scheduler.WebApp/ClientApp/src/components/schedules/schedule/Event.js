import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { appointmentTypes } from "../../../constants";

const TIME_FORMAT = "h:mm a";

const getEventColour = (type) => {
  switch (type) {
    case appointmentTypes.JOB_TASK:
      return "linear-gradient(to right, #11998e, #38ef7d)";
    case appointmentTypes.LEAVE:
    case appointmentTypes.OUT_OF_SERVICE:
      return "linear-gradient(to right, #b24592, #f15f79)";
    case appointmentTypes.TRAINING:
      return "linear-gradient(to right, #000046, #1cb5e0)";
    default:
      return "#000";
  }
};

const Container = styled.div`
  grid-column-start: ${({ startDay, header }) =>
    header ? startDay + 1 : startDay};
  grid-column-end: ${({ daySpan }) => `span ${daySpan}`};
  padding: 0.2em 0.5em;
  margin: 0.25em 0.5em;
  color: white;
  background: ${({ appointmentType }) => getEventColour(appointmentType)};
  overflow: hidden;
  cursor: pointer;

  ${({ starts }) =>
    starts &&
    `border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;`}

  ${({ ends }) =>
    ends &&
    `border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;`}
`;

const Header = styled.div`
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Duration = styled.div`
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Event = ({ appointment, ...props }) => {
  const { id, type, description, start, end, isConflicting } = appointment;
  return (
    <Container appointmentType={type} {...props}>
      <Header>{description}</Header>
      <Duration>
        {start.format(TIME_FORMAT)} - {end.format(TIME_FORMAT)}
      </Duration>
    </Container>
  );
};

export default Event;
