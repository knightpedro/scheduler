import { createAction, createReducer } from "@reduxjs/toolkit";

export const openPortal = createAction("portal/open");

export const closePortal = createAction("portal/close");

const portalReducer = createReducer(null, {
  [closePortal]: (state, action) => null,
  [openPortal]: (state, action) => action.payload,
});

export default portalReducer;
