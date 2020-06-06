import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import JobTaskForm from "../JobTaskForm";
import { selectJobTaskWithEntities } from "../../../ducks/globalSelectors";
import { workersSelectors } from "../../../ducks/workers";
import { resourceSelectors } from "../../../ducks/resources";
import { Icon, Header, Grid } from "semantic-ui-react";
import {
  createJobTask,
  updateJobTask,
  deleteJobTask,
} from "../../../ducks/jobTasks";
import { jobsSelectors } from "../../../ducks/jobs";
import { Link } from "react-router-dom";

const JobTaskFormPortal = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const jobTask = useSelector((state) => selectJobTaskWithEntities(state, id));
  const workerOptions = useSelector(workersSelectors.selectOptions);
  const resourceOptions = useSelector(resourceSelectors.selectOptions);
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
          <Header>{id ? "Edit " : "Create "} Task</Header>
          {jobTask && <Link>Job {jobTask.job.jobNumber}</Link>}
        </Grid.Column>
        <Grid.Column textAlign="right">
          {!id && <Link>Jobs</Link>}
          {id && <Icon link name="trash" onClick={handleDelete} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <JobTaskForm
            values={jobTask}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            jobOptions={jobOptions}
            resourceOptions={resourceOptions}
            workerOptions={workerOptions}
            {...props}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobTaskFormPortal;
