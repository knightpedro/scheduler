import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import {
  createTraining,
  updateTraining,
  deleteTraining,
} from "../../../ducks/training";
import TrainingForm from "../TrainingForm";
import { Grid, Header, Icon } from "semantic-ui-react";
import { workersSelectors } from "../../../ducks/workers";
import { trainingSelectors } from "../../../ducks/training";

const TrainingFormPortal = ({ id }) => {
  const dispatch = useDispatch();
  const training = useSelector((state) =>
    trainingSelectors.selectTrainingWithWorkerIds(state, id)
  );
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleCancel = () => {
    dispatch(closePortal());
  };

  const handleDelete = () => {
    dispatch(closePortal());
    dispatch(deleteTraining(id));
  };

  const handleSubmit = (values) => {
    dispatch(closePortal());
    if (id) {
      dispatch(updateTraining(values));
    } else {
      dispatch(createTraining(values));
    }
  };

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header>{id ? "Edit " : "Add "}Training</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          {id && <Icon link name="trash" onClick={handleDelete} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <TrainingForm
            values={training}
            workerOptions={workerOptions}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TrainingFormPortal;