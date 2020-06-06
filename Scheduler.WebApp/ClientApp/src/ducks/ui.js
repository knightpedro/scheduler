import { createReducer, createAction, createSelector } from "@reduxjs/toolkit";
import moment from "moment";

export const clearPeriod = createAction("app/clearPeriod");
export const setPeriod = createAction("app/setPeriod", ({ start, end }) => {
  return {
    payload: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
  };
});

const initialState = {
  period: {
    start: undefined,
    end: undefined,
  },
};

const selectPeriod = (state) => state.ui.period;

export const uiSelectors = {
  selectPeriod: createSelector(selectPeriod, ({ start, end }) => ({
    start: start ? moment(start) : undefined,
    end: end ? moment(end) : undefined,
  })),
};

export default createReducer(initialState, {
  [clearPeriod]: (state, action) => {
    state.period = { start: undefined, end: undefined };
  },
  [setPeriod]: (state, action) => {
    state.period = action.payload;
  },
});
