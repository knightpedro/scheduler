import React from "react";
import { useDispatch } from "react-redux";
import { openPortal } from "../../../ducks/portal";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { appointmentTypes } from "../../../constants";

const TIME_FORMAT = "h:mm a";

const getEventColour = (type) => {
  switch (type) {
    case appointmentTypes.JOB_TASK:
      return "#2185d0";
    case appointmentTypes.LEAVE:
    case appointmentTypes.OUT_OF_SERVICE:
      return "#e03997";
    case appointmentTypes.TRAINING:
      return "#00b5ad";
    default:
      return "#000";
  }
};

const Container = styled.div`
  display: flex;
  grid-column-start: ${({ startDay, header }) =>
    header ? startDay + 1 : startDay};
  grid-column-end: ${({ daySpan }) => `span ${daySpan}`};
  padding: 0.2em 0.5em;
  margin: 0.25em 0;
  color: white;
  background: ${({ isConflicting }) =>
    isConflicting &&
    `repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 10px,
      rgba(0, 0, 0, 0.15) 10px,
      rgba(0, 0, 0, 0.15) 20px
    )`};
  background-color: ${({ appointmentType }) => getEventColour(appointmentType)};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  cursor: pointer;

  > div {
    flex: 1;
    overflow: hidden;
  }

  > i {
    margin: 0.2em;
  }

  ${({ starts }) =>
    starts &&
    `margin-left: 0.5em;
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;`}

  ${({ ends }) =>
    ends &&
    `margin-right: 0.5em;
    border-top-right-radius: 0.3em;
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
  const dispatch = useDispatch();

  const handleEventClick = () => {
    dispatch(openPortal("test"));
  };

  return (
    <Container
      appointmentType={type}
      isConflicting={isConflicting}
      onClick={handleEventClick}
      title={description}
      {...props}
    >
      <div>
        <Header>{description}</Header>
        <Duration>
          {start.format(TIME_FORMAT)} - {end.format(TIME_FORMAT)}
        </Duration>
      </div>
      {isConflicting && <Icon name="exclamation triangle" />}
    </Container>
  );
};

export default Event;
