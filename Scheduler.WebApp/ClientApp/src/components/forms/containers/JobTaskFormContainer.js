import React from "react";
import { JobTaskForm } from "../";
import { useDispatch, useSelector } from "react-redux";
import {
  jobTaskSelectors,
  updateJobTask,
  createJobTask,
  deleteJobTask,
} from "../../../ducks/jobTasks";
import { workersSelectors } from "../../../ducks/workers";
import { resourcesSelectors } from "../../../ducks/resources";
import { Segment, Header, Icon, Grid } from "semantic-ui-react";
import { jobsSelectors } from "../../../ducks/jobs";
import { generatePath, Link } from "react-router-dom";
import routes from "../../../routes";

const JobTaskFormContainer = ({
  id,
  jobId,
  closeForm,
  showHeader = true,
  showDelete = false,
  showJobLink = true,
  ...props
}) => {
  const dispatch = useDispatch();

  const jobTask = useSelector((state) =>
    jobTaskSelectors.selectJobTaskWithEntities(state, id)
  );

  const values = { jobId, ...jobTask };

  const job = useSelector((state) =>
    jobsSelectors.selectById(state, values.jobId)
  );

  const resourceOptions = useSelector(resourcesSelectors.selectOptions);
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleCancel = () => {
    closeForm();
  };

  const handleDelete = () => {
    dispatch(deleteJobTask(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateJobTask(values));
    } else {
      dispatch(createJobTask(values));
    }
    closeForm();
  };

  return (
    <Segment padded {...props}>
      <Grid>
        {showHeader && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header>{id ? "Edit " : "Add "}Task</Header>
            </Grid.Column>
            {showDelete && id && (
              <Grid.Column textAlign="right">
                <Icon name="trash" link onClick={handleDelete} />
              </Grid.Column>
            )}
          </Grid.Row>
        )}
        {showJobLink && job && (
          <Link to={generatePath(routes.jobs.detail, { id: job.id })}>
            Job {job.jobNumber} - {job.description}
          </Link>
        )}
        <Grid.Row columns="equal">
          <Grid.Column>
            <JobTaskForm
              values={values}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              resourceOptions={resourceOptions}
              workerOptions={workerOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default JobTaskFormContainer;
