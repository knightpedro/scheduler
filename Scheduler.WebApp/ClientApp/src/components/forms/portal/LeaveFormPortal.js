import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import { Grid, Button, Header } from "semantic-ui-react";
import LeaveForm from "../LeaveForm";
import {
  leaveSelectors,
  updateLeave,
  createLeave,
  deleteLeave,
} from "../../../ducks/leave";
import { workersSelectors } from "../../../ducks/workers";

const LeaveFormPortal = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const leave = useSelector((state) => leaveSelectors.selectById(state, id));
  const leaveTypes = useSelector(leaveSelectors.selectLeaveTypes);
  const workers = useSelector(workersSelectors.selectAll);

  const leaveTypeOptions = leaveTypes.map((l) => ({ text: l, value: l }));
  const workerOptions = workers.map((w) => ({ text: w.name, value: w.id }));

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
        {id && <Button icon="trash" onClick={handleDelete} />}
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <LeaveForm
            values={leave}
            leaveTypeOptions={leaveTypeOptions}
            workerOptions={workerOptions}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            {...props}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LeaveFormPortal;
