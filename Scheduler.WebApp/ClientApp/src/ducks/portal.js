import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import {
  LeaveForm,
  TrainingForm,
  JobForm,
  JobTaskForm,
  WorkerForm,
} from "../components/forms";

const components = {
  JobForm: JobForm,
  JobTaskForm: JobTaskForm,
  LeaveForm: LeaveForm,
  TrainingForm: TrainingForm,
  WorkerForm: WorkerForm,
};

export const openPortal = createAction("portal/open");

export const closePortal = createAction("portal/close");

export const portalSelectors = {
  selectComponent: (state) => (state.portal ? components[state.portal] : null),
};

const portalReducer = createReducer(null, {
  [closePortal]: (state, action) => null,
  [openPortal]: (state, action) => action.payload,
});

export default portalReducer;
