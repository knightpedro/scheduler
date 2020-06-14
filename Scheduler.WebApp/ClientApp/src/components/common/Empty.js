import React from "react";
import { Segment, Header } from "semantic-ui-react";

const Empty = ({ message }) => (
  <Segment basic placeholder>
    <Header as="h4" content={message} textAlign="center" />
  </Segment>
);

export default Empty;
