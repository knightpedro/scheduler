import React from "react";
import { useDispatch } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import { LeaveFormContainer } from "../containers";

const LeaveFormPortal = (props) => {
  const dispatch = useDispatch();

  const handleFormClose = () => {
    dispatch(closePortal());
  };

  return (
    <LeaveFormContainer
      raised
      closeForm={handleFormClose}
      showDelete
      {...props}
    />
  );
};

export default LeaveFormPortal;
