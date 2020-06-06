import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { resourcesService } from "../services";
import { fetchAll } from "./sharedActions";

export const fetchResources = createAsyncThunk("resources/fetchAll", () =>
  resourcesService.getAll()
);

export const fetchResourceById = createAsyncThunk("resources/fetchOne", (id) =>
  resourcesService.getById(id)
);

export const updateResource = createAsyncThunk(
  "resources/update",
  async (values) => {
    await resourcesService.edit(values);
    return values;
  }
);

export const createResource = createAsyncThunk(
  "resources/create",
  async (values) => {
    const id = await resourcesService.create(values);
    return { id, ...values };
  }
);

export const deleteResource = createAsyncThunk(
  "resources/delete",
  async (id) => {
    await resourcesService.destroy(id);
    return id;
  }
);

const resourcesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const adapterSelectors = resourcesAdapter.getSelectors(
  (state) => state.resources
);

const selectFiltered = (state, filter) => {
  const resources = adapterSelectors.selectAll(state);
  if (!filter) return resources;
  return resources.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const selectOptions = (state) =>
  adapterSelectors.selectAll(state).map((r) => ({ text: r.name, value: r.id }));

export const resourcesSelectors = {
  ...adapterSelectors,
  selectFiltered,
  selectOptions,
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState: resourcesAdapter.getInitialState(),
  extraReducers: {
    [fetchResources.fulfilled]: (state, action) => {
      resourcesAdapter.setAll(state, action.payload);
    },
    [fetchResourceById.fulfilled]: (state, action) => {
      resourcesAdapter.upsertOne(state, action.payload);
    },
    [createResource.fulfilled]: (state, action) => {
      resourcesAdapter.addOne(state, action.payload);
    },
    [updateResource.fulfilled]: (state, action) => {
      resourcesAdapter.upsertOne(state, action.payload);
    },
    [deleteResource.fulfilled]: (state, action) => {
      resourcesAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      resourcesAdapter.setAll(state, action.payload.resources);
    },
  },
});

export default resourcesSlice.reducer;
