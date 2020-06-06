import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { workersService } from "../services";
import { fetchAll } from "./sharedActions";

export const fetchWorkers = createAsyncThunk("workers/fetchAll", () =>
  workersService.getAll()
);

export const createWorker = createAsyncThunk(
  "workers/create",
  async (worker) => {
    const id = await workersService.create(worker);
    return { id, ...worker };
  }
);

export const updateWorker = createAsyncThunk(
  "workers/update",
  async (worker) => {
    await workersService.edit(worker);
    return worker;
  }
);

export const deleteWorker = createAsyncThunk("workers/delete", async (id) => {
  await workersService.destroy(id);
  return id;
});

const workersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const adapterSelectors = workersAdapter.getSelectors((state) => state.workers);

const selectFiltered = (state, filter) => {
  const workers = adapterSelectors.selectAll(state);
  if (!filter) return workers;
  return workers.filter((w) =>
    w.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const workersSelectors = {
  ...adapterSelectors,
  selectFiltered,
};

const workersSlice = createSlice({
  name: "workers",
  initialState: workersAdapter.getInitialState(),
  extraReducers: {
    [fetchWorkers.fulfilled]: (state, action) => {
      workersAdapter.setAll(state, action.payload);
    },
    [createWorker.fulfilled]: (state, action) => {
      workersAdapter.addOne(state, action.payload);
    },
    [updateWorker.fulfilled]: (state, action) => {
      workersAdapter.upsertOne(state, action.payload);
    },
    [deleteWorker.fulfilled]: (state, action) => {
      workersAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      workersAdapter.setAll(state, action.payload.workers);
    },
  },
});

export default workersSlice.reducer;
