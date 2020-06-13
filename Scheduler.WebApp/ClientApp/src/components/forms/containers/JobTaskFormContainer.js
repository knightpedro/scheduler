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

const JobTaskFormContainer = ({ id, jobId, setShowForm, clearEditing }) => {
  const dispatch = useDispatch();

  const jobTask = useSelector((state) =>
    jobTaskSelectors.selectJobTaskWithEntities(state, id)
  );

  const values = { ...jobTask, jobId };

  const resourceOptions = useSelector(resourcesSelectors.selectOptions);
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleCancel = () => {
    setShowForm(false);
    clearEditing();
  };

  const handleDelete = () => {
    setShowForm(false);
    dispatch(deleteJobTask(id));
    clearEditing();
  };

  const handleSubmit = (values) => {
    setShowForm(false);
    if (id) {
      dispatch(updateJobTask(values));
    } else {
      dispatch(createJobTask(values));
    }
    clearEditing();
  };

  return (
    <Segment padded>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header>{id ? "Edit " : "Add "}Task</Header>
          </Grid.Column>
          {id && (
            <Grid.Column textAlign="right">
              <Icon name="trash" link onClick={handleDelete} />
            </Grid.Column>
          )}
        </Grid.Row>
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
