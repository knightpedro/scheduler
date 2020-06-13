import React from "react";
import { Header, Grid, Icon } from "semantic-ui-react";

const PageNotFound = () => (
  <Grid textAlign="center">
    <Header as="h2" icon textAlign="center">
      <Icon name="question" circular />
      <Header.Content>Page not found</Header.Content>
    </Header>
  </Grid>
);

export default PageNotFound;
