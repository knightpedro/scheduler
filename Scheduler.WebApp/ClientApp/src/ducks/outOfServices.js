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
} from "../utils/appointments";
import moment from "moment";

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
    dispatch(fetchConflictsByResourceId(id));
    return { id, ...oos };
  }
);

export const updateOutOfService = createAsyncThunk(
  "outOfServices/update",
  async (values, { dispatch }) => {
    const oos = transformMomentsToDates(values);
    await oosService.edit(transformMomentsToDates(oos));
    dispatch(fetchConflictsByResourceId(oos.id));
    return oos;
  }
);

export const deleteOutOfService = createAsyncThunk(
  "outOfServices/delete",
  async (id, { dispatch }) => {
    await oosService.destroy(id);
    dispatch(fetchConflictsByResourceId(id));
    return id;
  }
);

const outOfServiceAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = outOfServiceAdapter.getSelectors(
  (state) => state.outOfService
);

export const outOfServiceSelectors = {
  selectAll: (state) =>
    adapterSelectors.selectAll(state).map((o) => transformDatesToMoments(o)),
  selectById: (state, id) => {
    const entity = adapterSelectors.selectById(state, id);
    if (entity) return transformDatesToMoments(entity);
    return undefined;
  },
  selectByResourceId: (state, resourceId) =>
    adapterSelectors
      .selectAll(state)
      .filter((o) => o.resourceId === resourceId)
      .map((o) => transformDatesToMoments(o)),
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
