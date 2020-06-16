import React from "react";
import { useDispatch } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import { JobTaskFormContainer } from "../containers";

const JobTaskFormPortal = (props) => {
  const dispatch = useDispatch();

  const handleFormClose = () => {
    dispatch(closePortal());
  };

  return (
    <JobTaskFormContainer
      raised
      closeForm={handleFormClose}
      showDelete
      {...props}
    />
  );
};

export default JobTaskFormPortal;
