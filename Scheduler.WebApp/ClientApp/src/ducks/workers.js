import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { workersService } from "../services";

export const fetchWorkers = createAsyncThunk("workers/fetchAll", () =>
  workersService.getAll()
);

export const fetchCalendar = createAsyncThunk(
  "workers/fetchCalendar",
  ({ start, end }) => workersService.getAllCalenders(start, end)
);

export const fetchIndividualCalendar = createAsyncThunk(
  "workers/fetchIndividualCalendar",
  async ({ id, start, end }) =>
    workersService.getIndividualCalendar(id, start, end)
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

export const workersSelectors = workersAdapter.getSelectors(
  (state) => state.workers
);

const workersSlice = createSlice({
  name: "workers",
  initialState: workersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchWorkers.fulfilled]: (state, action) => {
      workersAdapter.setAll(state, action.payload);
    },
    [fetchCalendar.fulfilled]: (state, action) => {
      workersAdapter.setAll(state, action.payload);
    },
    [fetchIndividualCalendar.fulfilled]: (state, action) => {
      workersAdapter.upsertOne(state, action.payload);
    },
    [updateWorker.fulfilled]: (state, action) => {
      workersAdapter.upsertOne(state, action.payload);
    },
    [deleteWorker.fulfilled]: (state, action) => {
      workersAdapter.removeOne(state, action.payload);
    },
  },
});

export default workersSlice.reducer;
