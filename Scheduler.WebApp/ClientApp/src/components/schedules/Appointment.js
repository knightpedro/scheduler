import React from "react";
import { Header, Segment } from "semantic-ui-react";

export const Appointment = ({ id, description, start, end, path, type }) => {
  return (
    <Segment>
      <Header>{description}</Header>
    </Segment>
  );
};
