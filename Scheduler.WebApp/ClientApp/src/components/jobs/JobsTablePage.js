import React, { useState } from "react";
import JobsTable from "./JobsTable";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { Grid, Header, Button } from "semantic-ui-react";
import { useHistory, generatePath } from "react-router-dom";
import routes from "../../routes";
import JobFormContainer from "../forms/containers/JobFormContainer";

const JobsTablePage = () => {
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const jobs = useSelector(jobsSelectors.selectAllWithCoordinator);

  const goToJobDetail = (id) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
  };

  const handleFormClose = (id) => {
    setShowForm(false);
    if (id) goToJobDetail(id);
  };

  const handleJobClick = ({ id }) => {
    goToJobDetail(id);
  };

  const handleListClick = () => {
    history.push(routes.jobs.base);
  };

  return (
    <Grid padded relaxed="very" stackable>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" content="Jobs" />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            content="Add"
            color="teal"
            onClick={() => setShowForm(true)}
          />
          <Button icon="list" onClick={handleListClick} />
        </Grid.Column>
      </Grid.Row>
      {showForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <JobFormContainer closeForm={handleFormClose} />
          </Grid.Column>
        </Grid.Row>
      )}
      <Grid.Row columns="equal">
        <Grid.Column>
          <JobsTable jobs={jobs} handleClick={handleJobClick} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobsTablePage;
