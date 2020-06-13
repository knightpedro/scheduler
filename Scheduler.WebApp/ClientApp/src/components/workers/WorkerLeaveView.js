import React from "react";
import { useSelector } from "react-redux";
import { leaveSelectors } from "../../ducks/leave";
import { LeaveTable } from "../leave";
import { Empty } from "../common";

const WorkerLeaveView = ({ id }) => {
  const leave = useSelector((state) =>
    leaveSelectors.selectByWorker(state, id)
  );

  const handleLeaveClick = ({ id }) => {
    console.log(id);
  };

  return (
    <>
      {leave && leave.length > 0 ? (
        <LeaveTable leave={leave} handleClick={handleLeaveClick} />
      ) : (
        <Empty message="No leave found" />
      )}
    </>
  );
};

export default WorkerLeaveView;
