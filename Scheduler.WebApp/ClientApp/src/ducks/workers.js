import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { workersService } from "../services";
import { createAppointment, overlaps } from "../utils/appointments";
import { fetchAll } from "./combined";

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

const adapterSelectors = workersAdapter.getSelectors((state) => state.workers);

const selectFiltered = (state, filter) => {
  const workers = adapterSelectors.selectAll(state);
  if (!filter) return workers;
  return workers.filter((w) =>
    w.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const shapeCalendar = (workers, start, end) =>
  workers.reduce((calendar, worker) => {
    if (!worker.appointments) return calendar;
    const schedule = worker.appointments
      .map((a) => createAppointment(a))
      .filter((a) => overlaps(a, start, end))
      .sort((a, b) => a.start.unix() - b.start.unix());
    calendar.push({
      id: worker.id,
      name: worker.name,
      schedule,
    });
    return calendar;
  }, []);

const selectCalendar = (state, start, end) => {
  const workers = adapterSelectors.selectAll(state);
  return shapeCalendar(workers, start, end);
};

const selectFilteredCalendar = (state, start, end, filter) => {
  const workers = selectFiltered(state, filter);
  return shapeCalendar(workers, start, end);
};

export const workersSelectors = {
  ...adapterSelectors,
  selectFiltered,
  selectCalendar,
  selectFilteredCalendar,
};

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
