import React from "react";
import { useDispatch } from "react-redux";
import { closePortal } from "../../../ducks/portal";

import { TrainingFormContainer } from "../containers";

const TrainingFormPortal = (props) => {
  const dispatch = useDispatch();

  const handleFormClose = () => {
    dispatch(closePortal());
  };

  return (
    <TrainingFormContainer
      raised
      closeForm={handleFormClose}
      showDelete
      {...props}
    />
  );
};

export default TrainingFormPortal;
