import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import JobTaskForm from "../JobTaskForm";
import { jobTaskSelectors } from "../../../ducks/jobTasks";
import { workersSelectors } from "../../../ducks/workers";
import { resourcesSelectors } from "../../../ducks/resources";
import { Icon, Header, Grid } from "semantic-ui-react";
import {
  createJobTask,
  updateJobTask,
  deleteJobTask,
} from "../../../ducks/jobTasks";
import { jobsSelectors } from "../../../ducks/jobs";
import { Link } from "react-router-dom";

const JobTaskFormPortal = ({ id }) => {
  const dispatch = useDispatch();
  const jobTask = useSelector((state) =>
    jobTaskSelectors.selectJobTaskWithEntities(state, id)
  );
  const job = useSelector((state) =>
    jobsSelectors.selectById(state, jobTask ? jobTask.jobId : undefined)
  );
  const workerOptions = useSelector(workersSelectors.selectOptions);
  const resourceOptions = useSelector(resourcesSelectors.selectOptions);
  const jobOptions = useSelector(jobsSelectors.selectOptions);

  const handleCancel = () => {
    dispatch(closePortal());
  };

  const handleDelete = () => {
    dispatch(closePortal());
    dispatch(deleteJobTask(id));
  };

  const handleSubmit = (values) => {
    dispatch(closePortal());

    if (id) {
      dispatch(updateJobTask(values));
    } else {
      dispatch(createJobTask(values));
    }
  };

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header>{id ? "Edit " : "Add "} Task</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          {!id && <Link>Jobs</Link>}
          {id && <Icon link name="trash" onClick={handleDelete} />}
        </Grid.Column>
      </Grid.Row>
      {job && <Link>Job {job.jobNumber}</Link>}
      <Grid.Row columns="equal">
        <Grid.Column>
          <JobTaskForm
            values={jobTask}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            jobOptions={jobOptions}
            resourceOptions={resourceOptions}
            workerOptions={workerOptions}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobTaskFormPortal;
