import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import JobTaskForm from "../JobTaskForm";
import { selectJobTaskWithEntities } from "../../../ducks/globalSelectors";
import { workersSelectors } from "../../../ducks/workers";
import { resourceSelectors } from "../../../ducks/resources";
import { Button, Header, Grid } from "semantic-ui-react";
import {
  createJobTask,
  updateJobTask,
  deleteJobTask,
} from "../../../ducks/jobTasks";

const JobTaskFormPortal = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const jobTask = useSelector((state) => selectJobTaskWithEntities(state, id));
  const workers = useSelector(workersSelectors.selectAll);
  const resources = useSelector(resourceSelectors.selectAll);

  const workerOptions = workers.map((w) => ({ text: w.name, value: w.id }));
  const resourceOptions = resources.map((r) => ({ text: r.name, value: r.id }));

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
        </Grid.Column>
        {id && <Button icon="trash" onClick={handleDelete} />}
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <JobTaskForm
            values={jobTask}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
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
