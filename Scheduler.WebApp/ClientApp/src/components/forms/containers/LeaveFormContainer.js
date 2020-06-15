import React from "react";
import { LeaveForm } from "../";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveSelectors,
  deleteLeave,
  createLeave,
  updateLeave,
} from "../../../ducks/leave";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import { workersSelectors } from "../../../ducks/workers";

const LeaveFormContainer = ({
  id,
  workerId,
  closeForm,
  showHeader = true,
  showDelete = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const leave = useSelector((state) => leaveSelectors.selectById(state, id));
  const values = { workerId, ...leave };
  const leaveTypeOptions = useSelector(leaveSelectors.selectLeaveTypeOptions);
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleCancel = () => {
    closeForm();
  };

  const handleDelete = () => {
    dispatch(deleteLeave(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) dispatch(updateLeave(values));
    else dispatch(createLeave(values));
    closeForm();
  };

  return (
    <Segment padded {...props}>
      <Grid>
        {showHeader && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header>{id ? "Edit" : "Add"} Leave</Header>
            </Grid.Column>
            {showDelete && id && (
              <Grid.Column textAlign="right">
                <Icon name="trash" link onClick={handleDelete} />
              </Grid.Column>
            )}
          </Grid.Row>
        )}
        <Grid.Row columns="equal">
          <Grid.Column>
            <LeaveForm
              values={values}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              leaveTypeOptions={leaveTypeOptions}
              workerOptions={workerOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default LeaveFormContainer;
