import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResourceForm } from "../";
import {
  resourcesSelectors,
  deleteResource,
  updateResource,
  createResource,
} from "../../../ducks/resources";
import { unwrapResult } from "@reduxjs/toolkit";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";

const ResourceFormContainer = ({
  id,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const resource = useSelector((state) =>
    resourcesSelectors.selectById(state, id)
  );

  const handleDelete = () => {
    dispatch(deleteResource(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateResource(values));
      closeForm();
    } else {
      dispatch(createResource(values))
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
              <Header>{id ? "Edit" : "Add"} Plant</Header>
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
            <ResourceForm
              values={resource}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ResourceFormContainer;
