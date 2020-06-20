import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  coordinatorsSelectors,
  deleteCoordinator,
} from "../../ducks/coordinators";
import { Empty } from "../common";
import { Grid, Header, Icon, Button, Modal, Divider } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { CoordinatorFormContainer } from "../forms/containers";
import CoordinatorJobsTable from "./CoordinatorJobsTable";

const CoordinatorDetail = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const coordinator = useSelector((state) =>
    coordinatorsSelectors.selectById(state, id)
  );

  const handleDelete = () => {
    dispatch(deleteCoordinator(id)).then(() => {
      history.push(routes.coordinators.base);
    });
  };

  if (!coordinator) return <Empty basic message="Coordinator not found" />;

  return (
    <>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header as="h2">
              <Icon
                name="user"
                color={coordinator.isActive ? "green" : "red"}
              />
              <Header.Content>
                {coordinator.name}
                <Header.Subheader>{coordinator.email}</Header.Subheader>
              </Header.Content>
            </Header>
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
              <CoordinatorFormContainer
                id={id}
                closeForm={() => setShowForm(false)}
                showHeader={false}
              />
            </Grid.Column>
          </Grid.Row>
        )}
        <Divider hidden />
        <Grid.Row columns="equal">
          <Grid.Column>
            <Header>Jobs</Header>
            <CoordinatorJobsTable id={id} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Header content="Delete Coordinator" />
          <Modal.Content>
            Are you sure you want to delete {coordinator.name}?
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

export default CoordinatorDetail;
