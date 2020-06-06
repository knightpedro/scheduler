import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { resourcesService } from "../services";
import { fetchAll } from "./sharedActions";
import { createResource, deleteResource } from "./resources";

export const fetchResourceConflicts = createAsyncThunk(
  "resourceConflicts/fetchAll",
  () => resourcesService.getAllConflicts()
);

export const fetchConflictsByResourceId = createAsyncThunk(
  "resourceConflicts/fetchOne",
  (id) => resourcesService.getConflictsByResourceId(id)
);

const resourceConflictsAdapter = createEntityAdapter();

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
