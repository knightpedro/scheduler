import { createReducer, createAction, createSelector } from "@reduxjs/toolkit";
import moment from "moment";

export const clearPeriod = createAction("app/clearPeriod");
export const setPeriod = createAction("app/setPeriod");

const initialState = {
  period: {
    start: undefined,
    end: undefined,
  },
};

const selectPeriod = (state) => state.ui.period;

export const uiSelectors = {
  selectPeriod: createSelector(selectPeriod, ({ start, end }) => ({
    start: start ? moment(start) : null,
    end: end ? moment(end) : null,
  })),
};

export default createReducer(initialState, {
  [clearPeriod]: (state, action) => {
    state.period = { start: undefined, end: undefined };
  },
  [setPeriod]: (state, action) => {
    const { start, end } = action.payload;
    if (start && end && end.isAfter(start)) {
      state.period = {
        start: start.toDate(),
        end: start.toDate(),
      };
    }
  },
});
