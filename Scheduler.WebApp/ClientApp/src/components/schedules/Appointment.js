import React from "react";
import { Segment, Header, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import { appointmentTypes } from "../../constants";

const StyledSegment = styled(Segment)`
  cursor: pointer;

  &&& h5 {
    margin-bottom: 5px;
  }
`;

const getAppointmentColour = (type) => {
  switch (type) {
    case appointmentTypes.JOB_TASK:
      return "teal";
    case appointmentTypes.LEAVE:
      return "pink";
    case appointmentTypes.OUT_OF_SERVICE:
      return "pink";
    case appointmentTypes.TRAINING:
      return "yellow";
  }
};

export const Appointment = ({
  id,
  type,
  description,
  start,
  end,
  isConflicting,
  path,
}) => {
  return (
    <StyledSegment
      raised
      color={isConflicting ? null : getAppointmentColour(type)}
    >
      {isConflicting && (
        <Label attached="top" color="red">
          <Icon name="exclamation triangle" />
          Conflict
        </Label>
      )}
      <Header as="h5">{description}</Header>
      <p>
        {start.format("HH:mm")}-{end.format("HH:mm")}
      </p>
    </StyledSegment>
  );
};
