import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import { Grid, Icon, Header } from "semantic-ui-react";
import LeaveForm from "../LeaveForm";
import {
  leaveSelectors,
  updateLeave,
  createLeave,
  deleteLeave,
} from "../../../ducks/leave";
import { workersSelectors } from "../../../ducks/workers";

const LeaveFormPortal = ({ id }) => {
  const dispatch = useDispatch();
  const leave = useSelector((state) => leaveSelectors.selectById(state, id));
  const leaveTypeOptions = useSelector(leaveSelectors.selectLeaveTypeOptions);
  const workerOptions = useSelector(workersSelectors.selectOptions);

  const handleCancel = () => {
    dispatch(closePortal());
  };

  const handleDelete = () => {
    dispatch(closePortal());
    dispatch(deleteLeave(id));
  };

  const handleSubmit = (values) => {
    dispatch(closePortal());
    if (id) {
      dispatch(updateLeave(values));
    } else {
      dispatch(createLeave(values));
    }
  };

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header>{id ? "Edit " : "Add "}Leave</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          {id && <Icon link name="trash" onClick={handleDelete} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <LeaveForm
            values={leave}
            leaveTypeOptions={leaveTypeOptions}
            workerOptions={workerOptions}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LeaveFormPortal;
