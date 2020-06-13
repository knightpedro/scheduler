import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  JobTaskFormPortal,
  LeaveFormPortal,
  OutOfServiceFormPortal,
  TrainingFormPortal,
} from "../components/forms/portal";

export const portalComponents = {
  jobForm: "jobForm",
  jobTaskForm: "jobTaskForm",
  leaveForm: "leaveForm",
  outOfServiceForm: "outOfServiceForm",
  trainingForm: "trainingForm",
  workerForm: "workerForm",
};

const componentLookUp = {
  [portalComponents.jobTaskForm]: JobTaskFormPortal,
  [portalComponents.leaveForm]: LeaveFormPortal,
  [portalComponents.outOfServiceForm]: OutOfServiceFormPortal,
  [portalComponents.trainingForm]: TrainingFormPortal,
};

export const openPortal = createAction("portal/open", (component, props) => {
  return {
    payload: {
      component,
      props,
    },
  };
});

export const closePortal = createAction("portal/close");

export const portalSelectors = {
  selectComponent: (state) => {
    if (state.portal)
      return {
        Component: componentLookUp[state.portal.component],
        props: state.portal.props,
      };
    return null;
  },
};

const portalReducer = createReducer(null, {
  [closePortal]: (state, action) => null,
  [openPortal]: (state, action) => action.payload,
});

export default portalReducer;
