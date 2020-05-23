import { createAction } from "@reduxjs/toolkit";

export const createLoadingSelector = (actions) => (state) =>
  actions.some((action) => state.loading[action]);

const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)[/](pending|fulfilled|rejected)/.exec(type);
  if (!matches) return state;
  const [, request, status] = matches;
  return { ...state, [request]: status === "pending" };
};

export default loadingReducer;
