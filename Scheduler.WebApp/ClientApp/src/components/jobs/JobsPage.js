import React, { useEffect, useState } from "react";
import JobsTable from "./JobsTable";
import { useDispatch, useSelector } from "react-redux";
import { jobsSelectors, createJob } from "../../ducks/jobs";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Header, Button, Segment } from "semantic-ui-react";
import { JobForm } from "../forms";
import { coordinatorsSelectors } from "../../ducks/coordinators";
import { useHistory, generatePath } from "react-router-dom";
import routes from "../../routes";

const JobsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const jobs = useSelector(jobsSelectors.selectAllWithCoordinator);
  const coordinatorOptions = useSelector(coordinatorsSelectors.selectOptions);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleSubmit = (values) => {
    setShowForm(false);
    dispatch(createJob(values));
  };

  const handleJobClick = ({ id }) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
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
        </Grid.Column>
      </Grid.Row>
      {showForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Segment>
              <JobForm
                coordinatorOptions={coordinatorOptions}
                handleCancel={() => setShowForm(false)}
                handleSubmit={handleSubmit}
              />
            </Segment>
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

export default JobsPage;
