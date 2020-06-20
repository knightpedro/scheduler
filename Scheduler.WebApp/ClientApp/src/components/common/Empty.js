import React from "react";
import { Segment, Header } from "semantic-ui-react";

const Empty = ({ message, ...props }) => (
  <Segment placeholder {...props}>
    <Header as="h4" content={message} textAlign="center" />
  </Segment>
);

export default Empty;
