import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainingForm } from "../";
import {
  trainingSelectors,
  updateTraining,
  createTraining,
  deleteTraining,
} from "../../../ducks/training";
import { workersSelectors } from "../../../ducks/workers";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import { unwrapResult } from "@reduxjs/toolkit";

const TrainingFormContainer = ({
  id,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const training = useSelector((state) =>
    trainingSelectors.selectTrainingWithWorkerIds(state, id)
  );
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteTraining(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateTraining(values));
      closeForm();
    } else
      dispatch(createTraining(values))
        .then(unwrapResult)
        .then(({ id }) => {
          closeForm(id);
        });
  };

  return (
    <Segment padded {...props}>
      <Grid>
        {showHeader && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header>{id ? "Edit" : "Add"} Training</Header>
            </Grid.Column>
            {showDelete && id && (
              <Grid.Column textAlign="right">
                <Icon link name="trash" onClick={handleDelete} />
              </Grid.Column>
            )}
          </Grid.Row>
        )}
        <Grid.Row columns="equal">
          <Grid.Column>
            <TrainingForm
              values={training}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
              workerOptions={workerOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default TrainingFormContainer;
