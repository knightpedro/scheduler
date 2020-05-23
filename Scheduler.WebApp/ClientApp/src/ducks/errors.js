import { createAction } from "@reduxjs/toolkit";

export const clearError = createAction("clearError");

export const clearAllErrors = createAction("clearAllErrors");

export const createErrorsSelector = (actions) => (state) => {
  const matches = Object.keys(state.errors).filter(
    (e) => state.errors[e] != null && actions.includes(e)
  );
  return matches.map((m) => state.errors[m]);
};

const errorsReducer = (state = {}, action) => {
  const { type } = action;
  if (type === clearAllErrors.type) return {};
  if (type === clearError.type) {
    return { ...state, [action.payload]: null };
  }
  const matches = /(.*)[/](pending|fulfilled|rejected)/.exec(type);
  if (!matches) return state;
  const [, request] = matches;
  if (action.error) {
    return { ...state, [request]: action.error.message };
  }
  return { ...state, [request]: null };
};

export default errorsReducer;
