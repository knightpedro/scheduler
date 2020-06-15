import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoordinatorForm } from "../";
import {
  coordinatorsSelectors,
  deleteCoordinator,
  updateCoordinator,
  createCoordinator,
} from "../../../ducks/coordinators";
import { unwrapResult } from "@reduxjs/toolkit";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";

const CoordinatorFormContainer = ({
  id,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const coordinator = useSelector((state) =>
    coordinatorsSelectors.selectById(state, id)
  );

  const handleDelete = () => {
    dispatch(deleteCoordinator(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateCoordinator(values));
      closeForm();
    } else {
      dispatch(createCoordinator(values))
        .then(unwrapResult)
        .then(({ id }) => {
          closeForm(id);
        });
    }
  };

  return (
    <Segment padded {...props}>
      <Grid>
        {showHeader && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header>{id ? "Edit" : "Add"} Coordinator</Header>
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
            <CoordinatorForm
              values={coordinator}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default CoordinatorFormContainer;
