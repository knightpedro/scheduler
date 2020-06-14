import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Grid,
  Header,
  Button,
  Modal,
  Segment,
  Divider,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { jobsSelectors, deleteJob, updateJob } from "../../ducks/jobs";
import routes from "../../routes";
import { JobTasksTable } from "../jobTasks";
import { JobForm } from "../forms";
import { coordinatorSelectors } from "../../ducks/coordinators";
import JobDetailTable from "./JobDetailTable";
import { Empty } from "../common";
import { JobTaskFormContainer } from "../forms/containers";
import queryString from "query-string";

const JobDetail = ({ id }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setSelectedTaskId();
    setShowTaskForm(false);
  }, [id]);

  const search = useLocation().search;
  const taskId = queryString.parse(search, { parseNumbers: true })["task"];

  useEffect(() => {
    if (taskId) {
      setSelectedTaskId(taskId);
      setShowTaskForm(true);
    }
  }, [taskId]);

  const job = useSelector((state) =>
    jobsSelectors.selectJobWithEntities(state, id)
  );
  const coordinatorOptions = useSelector(coordinatorSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteJob(id));
    history.push(routes.jobs.list);
  };

  const handleJobSubmit = (values) => {
    const { coordinator, jobTasks, ...job } = values;
    setShowJobForm(false);
    dispatch(updateJob(job));
  };

  const handleAddTaskClick = () => {
    setSelectedTaskId();
    setShowTaskForm(true);
  };

  const handleTaskClick = ({ id }) => {
    setSelectedTaskId(id);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setSelectedTaskId();
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
            <Segment padded>
              <JobForm
                values={job}
                coordinatorOptions={coordinatorOptions}
                handleCancel={() => setShowJobForm(false)}
                handleSubmit={handleJobSubmit}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row columns="equal">
        <Grid.Column>
          <JobDetailTable job={job} />
        </Grid.Column>
      </Grid.Row>

      <Divider hidden />

      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header>Tasks</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            floated="right"
            color="teal"
            content="Add"
            onClick={handleAddTaskClick}
          />
        </Grid.Column>
      </Grid.Row>

      {showTaskForm && (
        <Grid.Row>
          <Grid.Column>
            <JobTaskFormContainer
              id={selectedTaskId}
              jobId={id}
              closeForm={handleTaskFormClose}
            />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row columns="equal">
        <Grid.Column>
          {job.jobTasks && job.jobTasks.length > 0 ? (
            <JobTasksTable
              jobTasks={job.jobTasks}
              handleClick={handleTaskClick}
            />
          ) : (
            <Empty message="No tasks found" />
          )}
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
