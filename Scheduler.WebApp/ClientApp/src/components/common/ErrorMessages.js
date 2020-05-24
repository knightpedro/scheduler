import React from "react";
import { clearAllErrors, selectAllErrors } from "../../ducks/errors";
import { Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessages = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectAllErrors);
  if (!errors || errors.length === 0) return null;
  return (
    <Message
      negative
      header="Errors"
      list={errors}
      onDismiss={() => dispatch(clearAllErrors())}
    ></Message>
  );
};

export default ErrorMessages;
