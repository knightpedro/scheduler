import React from "react";
import { useDispatch } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import { OutOfServiceFormContainer } from "../containers";

const OutOfServiceFormPortal = (props) => {
  const dispatch = useDispatch();

  const handleFormClose = () => {
    dispatch(closePortal());
  };

  return (
    <OutOfServiceFormContainer
      raised
      closeForm={handleFormClose}
      showDelete
      {...props}
    />
  );
};

export default OutOfServiceFormPortal;
