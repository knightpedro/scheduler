import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { resourcesService } from "../services";
import { fetchAll } from "./sharedActions";
import { createResource, deleteResource } from "./resources";
import { appointmentTypes } from "../constants";

export const fetchResourceConflicts = createAsyncThunk(
  "resourceConflicts/fetchAll",
  () => resourcesService.getAllConflicts()
);

export const fetchConflictsByResourceId = createAsyncThunk(
  "resourceConflicts/fetchOne",
  (id) => resourcesService.getConflictsByResourceId(id)
);

const resourceConflictsAdapter = createEntityAdapter();

const adapterSelectors = resourceConflictsAdapter.getSelectors(
  (state) => state.resourceConflicts
);

const shapeConflictsByType = (resource) =>
  resource.conflicts.reduce(
    (eventMap, conflict) => {
      const events = [conflict.eventA, conflict.eventB];
      events.forEach((e) => {
        const { id, type } = e;
        eventMap[type].push(id);
      });
      return eventMap;
    },
    {
      [appointmentTypes.JOB_TASK]: [],
      [appointmentTypes.OUT_OF_SERVICE]: [],
    }
  );

const selectConflictMapForResource = (state, id) => {
  const resource = adapterSelectors.selectById(id);
  return shapeConflictsByType(resource);
};

const selectResourcesConflictMap = (state) => {
  const conflicts = adapterSelectors.selectAll(state);
  return conflicts.reduce((resourceMap, resource) => {
    resourceMap[resource.id] = shapeConflictsByType(resource);
    return resourceMap;
  }, {});
};

export const resourceConflictsSelectors = {
  ...adapterSelectors,
  selectConflictMapForResource,
  selectResourcesConflictMap,
};

const resourceConflictsSlice = createSlice({
  name: "resourceConflicts",
  initialState: resourceConflictsAdapter.getInitialState(),
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      resourceConflictsAdapter.setAll(state, action.payload.resourceConflicts);
    },
    [fetchResourceConflicts.fulfilled]: (state, action) => {
      resourceConflictsAdapter.setAll(state, action.payload);
    },
    [fetchConflictsByResourceId.fulfilled]: (state, action) => {
      resourceConflictsAdapter.upsertOne(state, action.payload);
    },
    [createResource.fulfilled]: (state, action) => {
      resourceConflictsAdapter.addOne(state, {
        id: action.payload.id,
        conflicts: [],
      });
    },
    [deleteResource.fulfilled]: (state, action) =>
      resourceConflictsAdapter.removeOne(state, action.payload),
  },
});

export default resourceConflictsSlice.reducer;
