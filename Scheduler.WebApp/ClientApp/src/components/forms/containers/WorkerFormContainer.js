import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkerForm } from "../";
import {
  workersSelectors,
  deleteWorker,
  updateWorker,
  createWorker,
} from "../../../ducks/workers";

import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import { unwrapResult } from "@reduxjs/toolkit";

const WorkerFormContainer = ({
  id,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const worker = useSelector((state) => workersSelectors.selectById(state, id));

  const handleDelete = () => {
    dispatch(deleteWorker(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateWorker(values));
      closeForm();
    } else {
      dispatch(createWorker(values))
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
              <Header>{id ? "Edit" : "Add"} Staff Member</Header>
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
            <WorkerForm
              values={worker}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default WorkerFormContainer;
