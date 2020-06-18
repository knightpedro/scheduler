import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { oosService } from "../services";
import { fetchAll } from "./sharedActions";
import { fetchConflictsByResourceId } from "./resourceConflicts";
import {
  transformDatesToMoments,
  transformMomentsToDates,
  overlaps,
} from "../utils/appointments";
import moment from "moment";
import { appointmentTypes } from "../constants";
import { resourcesSelectors } from "./resources";

export const fetchOutOfServices = createAsyncThunk(
  "outOfServices/fetchAll",
  () => oosService.getAll()
);

export const fetchOutOfServiceById = createAsyncThunk(
  "outOfServices/fetchOne",
  (id) => oosService.getById(id)
);

export const createOutOfService = createAsyncThunk(
  "outOfServices/create",
  async (values, { dispatch }) => {
    const oos = transformMomentsToDates(values);
    const id = await oosService.create(oos);
    dispatch(fetchConflictsByResourceId(oos.resourceId));
    return { id, ...oos };
  }
);

export const updateOutOfService = createAsyncThunk(
  "outOfServices/update",
  async (values, { dispatch }) => {
    const oos = transformMomentsToDates(values);
    await oosService.edit(oos);
    dispatch(fetchConflictsByResourceId(oos.resourceId));
    return oos;
  }
);

export const deleteOutOfService = createAsyncThunk(
  "outOfServices/delete",
  async (id, { getState, dispatch }) => {
    const state = getState();
    const oos = outOfServiceSelectors.selectById(state, id);
    await oosService.destroy(id);
    dispatch(fetchConflictsByResourceId(oos.resourceId));
    return id;
  }
);

const outOfServiceAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = outOfServiceAdapter.getSelectors(
  (state) => state.outOfServices
);

const selectAll = (state) =>
  adapterSelectors.selectAll(state).map((o) => transformDatesToMoments(o));

const selectById = (state, id) => {
  const entity = adapterSelectors.selectById(state, id);
  if (entity) return transformDatesToMoments(entity);
  return undefined;
};

const selectByResource = (state, resourceId) =>
  adapterSelectors
    .selectAll(state)
    .filter((o) => o.resourceId === resourceId)
    .map((o) => transformDatesToMoments(o));

const selectEventsForResource = (state, resourceId, conflicts) =>
  selectByResource(state, resourceId).map((o) => ({
    id: o.id,
    type: appointmentTypes.OUT_OF_SERVICE,
    description: o.description,
    start: o.start,
    end: o.end,
    isConflicting: conflicts[appointmentTypes.OUT_OF_SERVICE].includes(o.id),
  }));

const selectOutOfServiceTypes = (state) => state.outOfServices.types;

const selectOutOfServiceTypeOptions = (state) =>
  selectOutOfServiceTypes(state).map((o) => ({ text: o, value: o }));

const selectOutOfServiceHoursForPeriod = (state, start, end) => {
  const oos = selectAll(state).filter((o) => {
    if (moment.isMoment(start) && moment.isMoment(end)) {
      return overlaps(o, start, end);
    }
    if (moment.isMoment(start)) return o.end.isAfter(start);
    if (moment.isMoment(end)) return o.start.isBefore(end);
    return true;
  });

  return resourcesSelectors.selectAll(state).map((resource) => ({
    ...resource,
    downtime: oos.reduce((hours, o) => {
      if (o.resourceId === resource.id)
        return hours + o.end.diff(o.start, "hours");
      return hours;
    }, 0),
  }));
};

export const outOfServiceSelectors = {
  selectAll,
  selectById,
  selectByResource,
  selectEventsForResource,
  selectOutOfServiceTypes,
  selectOutOfServiceTypeOptions,
  selectOutOfServiceHoursForPeriod,
};

const outOfServicesSlice = createSlice({
  name: "outOfServices",
  initialState: { ...outOfServiceAdapter.getInitialState(), types: [] },
  extraReducers: {
    [createOutOfService.fulfilled]: (state, action) => {
      outOfServiceAdapter.addOne(state, action.payload);
    },
    [deleteOutOfService.fulfilled]: (state, action) => {
      outOfServiceAdapter.removeOne(state, action.payload);
    },
    [fetchOutOfServices.fulfilled]: (state, action) => {
      outOfServiceAdapter.setAll(state, action.payload);
    },
    [fetchOutOfServiceById.fulfilled]: (state, action) => {
      outOfServiceAdapter.upsertOne(state, action.payload);
    },
    [updateOutOfService.fulfilled]: (state, action) => {
      outOfServiceAdapter.upsertOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      outOfServiceAdapter.setAll(state, action.payload.outOfServices);
      state.types = action.payload.outOfServiceTypes.sort();
    },
  },
});

export default outOfServicesSlice.reducer;
