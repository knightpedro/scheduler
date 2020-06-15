import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { JobForm } from "../";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  jobsSelectors,
  deleteJob,
  updateJob,
  createJob,
} from "../../../ducks/jobs";
import { coordinatorsSelectors } from "../../../ducks/coordinators";

const JobFormContainer = ({
  id,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const job = useSelector((state) => jobsSelectors.selectById(state, id));
  const coordinatorOptions = useSelector(coordinatorsSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteJob(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateJob(values));
      closeForm();
    } else {
      dispatch(createJob(values))
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
              <Header>{id ? "Edit" : "Add"} Job</Header>
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
            <JobForm
              values={job}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
              coordinatorOptions={coordinatorOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default JobFormContainer;
