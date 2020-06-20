import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { leaveSelectors } from "../../ducks/leave";
import { LeaveTable } from "../leave";
import { LeaveFormContainer } from "../forms/containers";
import { Empty } from "../common";
import { Grid, Button } from "semantic-ui-react";

const WorkerLeaveView = ({ id }) => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState();

  const leave = useSelector((state) =>
    leaveSelectors.selectByWorker(state, id)
  );

  useEffect(() => {
    handleCloseForm();
  }, [id]);

  const handleAddLeaveClick = () => {
    setSelectedLeaveId();
    setShowLeaveForm(true);
  };

  const handleCloseForm = () => {
    setShowLeaveForm(false);
    setSelectedLeaveId();
  };

  const handleLeaveClick = ({ id }) => {
    setSelectedLeaveId(id);
    setShowLeaveForm(true);
  };

  return (
    <Grid>
      {showLeaveForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <LeaveFormContainer
              id={selectedLeaveId}
              workerId={id}
              closeForm={handleCloseForm}
              showDelete
            />
          </Grid.Column>
        </Grid.Row>
      )}

      {leave && leave.length > 0 ? (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Button
              color="teal"
              content="Add"
              onClick={handleAddLeaveClick}
              floated="right"
            />
            <LeaveTable leave={leave} handleClick={handleLeaveClick} />
          </Grid.Column>
        </Grid.Row>
      ) : (
        <>
          <Grid.Row>
            <Grid.Column width={16} textAlign="right">
              <Button
                color="teal"
                content="Add"
                onClick={handleAddLeaveClick}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Empty message="No leave found" />
            </Grid.Column>
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};

export default WorkerLeaveView;
