import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Header, Button, Modal, Divider } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { jobsSelectors, deleteJob, updateJob } from "../../ducks/jobs";
import routes from "../../routes";
import JobDetailTable from "./JobDetailTable";
import { Empty } from "../common";
import JobFormContainer from "../forms/containers/JobFormContainer";
import JobTasksView from "./JobTasksView";

const JobDetail = ({ id }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const job = useSelector((state) =>
    jobsSelectors.selectJobWithEntities(state, id)
  );

  const handleDelete = () => {
    dispatch(deleteJob(id)).then(() => {
      history.push(routes.jobs.base);
    });
  };

  const handleToggleComplete = () => {
    const { coordinator, jobTasks, ...values } = job;
    values.isComplete = !values.isComplete;
    dispatch(updateJob(values));
  };

  if (!job) return <Empty message="Job not found" />;

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" content={job.jobNumber} subheader={job.description} />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button icon="edit" onClick={() => setShowJobForm(true)} />
            <Button icon="trash" onClick={() => setShowModal(true)} />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>

      {showJobForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <JobFormContainer
              id={id}
              closeForm={() => setShowJobForm(false)}
              showHeader={false}
            />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row columns="equal">
        <Grid.Column>
          <JobDetailTable
            job={job}
            handleToggleComplete={handleToggleComplete}
          />
        </Grid.Column>
      </Grid.Row>

      <Divider hidden />

      <Grid.Row columns="equal">
        <Grid.Column>
          <JobTasksView jobId={id} />
        </Grid.Column>
      </Grid.Row>

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Header content="Delete Job" />
          <Modal.Content>
            Are you sure you want to delete job {job.jobNumber}?
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setShowModal(false)} content="Cancel" />
            <Button onClick={handleDelete} content="Delete" negative />
          </Modal.Actions>
        </Modal>
      )}
    </Grid>
  );
};

export default JobDetail;
