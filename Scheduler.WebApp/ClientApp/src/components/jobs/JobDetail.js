import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Header, Button, Modal, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { jobsSelectors, deleteJob, updateJob } from "../../ducks/jobs";
import routes from "../../routes";
import { JobTasksTable } from "../jobTasks";
import { JobForm } from "../forms";
import { coordinatorSelectors } from "../../ducks/coordinators";

const JobDetail = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const jobId = parseInt(id);

  const job = useSelector((state) =>
    jobsSelectors.selectJobWithEntities(state, jobId)
  );
  const coordinatorOptions = useSelector(coordinatorSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteJob(jobId));
    history.push(routes.jobs.list);
  };

  const handleJobSubmit = (values) => {
    const { coordinator, jobTasks, ...job } = values;
    setShowForm(false);
    dispatch(updateJob(job));
  };

  if (!job) return "Job not found";

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2">{job.jobNumber}</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button icon="edit" onClick={() => setShowForm(true)} />
            <Button icon="trash" onClick={() => setShowModal(true)} />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      {showForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Segment padded>
              <JobForm
                values={job}
                coordinatorOptions={coordinatorOptions}
                handleCancel={() => setShowForm(false)}
                handleSubmit={handleJobSubmit}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header>Tasks</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button floated="right" color="teal" content="Add" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <JobTasksTable jobTasks={job.jobTasks} />
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
