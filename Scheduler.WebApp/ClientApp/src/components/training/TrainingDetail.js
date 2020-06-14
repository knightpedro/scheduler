import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  trainingSelectors,
  deleteTraining,
  updateTraining,
} from "../../ducks/training";
import { Empty } from "../common";
import { Grid, Button, Header, Modal, Segment } from "semantic-ui-react";
import TrainingDetailTable from "./TrainingDetailTable";
import TrainingAttendees from "./TrainingAttendees";
import { workersSelectors } from "../../ducks/workers";
import { TrainingFormContainer } from "../forms/containers";

const TrainingDetail = ({ id }) => {
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const training = useSelector((state) =>
    trainingSelectors.selectTrainingWithWorkerIds(state, id)
  );
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteTraining(id));
  };

  if (!training) return <Empty message="Training not found" />;

  return (
    <>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header
              as="h2"
              content={training.description}
              subheader={training.location}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button.Group>
              <Button icon="edit" onClick={() => setShowTrainingForm(true)} />
              <Button icon="trash" onClick={() => setShowModal(true)} />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>

        {showTrainingForm && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <TrainingFormContainer
                id={id}
                closeForm={() => setShowTrainingForm(false)}
                showHeader={false}
              />
            </Grid.Column>
          </Grid.Row>
        )}

        <Grid.Row columns="equal">
          <Grid.Column>
            <TrainingDetailTable training={training} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header content="Attending" />
            <TrainingAttendees id={id} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Header content="Delete Training" />
          <Modal.Content>
            Are you sure you want to delete {training.description}?
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setShowModal(false)} content="Cancel" />
            <Button onClick={handleDelete} content="Delete" negative />
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default TrainingDetail;
