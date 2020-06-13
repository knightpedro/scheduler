import React from "react";
import { Grid } from "semantic-ui-react";
import JobsList from "./JobsList";
import JobDetail from "./JobDetail";
import { generatePath, useHistory } from "react-router-dom";
import routes from "../../routes";

const JobDetailPage = () => {
  const history = useHistory();

  const handleJobClick = (id) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
  };
  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row>
        <Grid.Column width={4}>
          <JobsList handleClick={handleJobClick} />
        </Grid.Column>
        <Grid.Column width={12}>
          <JobDetail />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobDetailPage;
