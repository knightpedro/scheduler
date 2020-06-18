import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { coordinatorsService } from "../services";
import { fetchAll } from "./sharedActions";
import { jobsSelectors } from "./jobs";

export const fetchCoordinators = createAsyncThunk("coordinators/fetchAll", () =>
  coordinatorsService.getAll()
);

export const fetchCoordinatorById = createAsyncThunk(
  "coordinators/fetchOne",
  (id) => coordinatorsService.getById(id)
);

export const createCoordinator = createAsyncThunk(
  "coordinators/create",
  async (values) => {
    const id = await coordinatorsService.create(values);
    return { id, ...values };
  }
);

export const updateCoordinator = createAsyncThunk(
  "coordinators/update",
  async (values) => {
    await coordinatorsService.edit(values);
    return values;
  }
);

export const deleteCoordinator = createAsyncThunk(
  "coordinators/delete",
  async (id) => {
    await coordinatorsService.destroy(id);
    return id;
  }
);

const coordinatorsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const adapterSelectors = coordinatorsAdapter.getSelectors(
  (state) => state.coordinators
);

const selectFiltered = (state, filter) => {
  const coordinators = adapterSelectors.selectAll(state);
  if (!filter) return coordinators;
  return coordinators.filter((coordinator) =>
    coordinator.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const selectWorkLoadsForPeriod = (state, start, end) => {
  const jobs = jobsSelectors.selectByDate(state, start, end);

  return adapterSelectors.selectAll(state).map((c) => ({
    ...c,
    jobs: jobs.reduce((val, job) => {
      if (job.coordinatorId === c.id) return val + 1;
      return val;
    }, 0),
  }));
};

const selectOptions = (state) =>
  adapterSelectors
    .selectAll(state)
    .map((coordinator) => ({ text: coordinator.name, value: coordinator.id }));

export const coordinatorsSelectors = {
  ...adapterSelectors,
  selectFiltered,
  selectOptions,
  selectWorkLoadsForPeriod,
};

const coordinatorsSlice = createSlice({
  name: "coordinators",
  initialState: coordinatorsAdapter.getInitialState(),
  extraReducers: {
    [fetchCoordinators.fulfilled]: (state, action) => {
      coordinatorsAdapter.setAll(state, action.payload);
    },
    [fetchCoordinatorById.fulfilled]: (state, action) => {
      coordinatorsAdapter.upsertOne(state, action.payload);
    },
    [createCoordinator.fulfilled]: (state, action) => {
      coordinatorsAdapter.addOne(state, action.payload);
    },
    [updateCoordinator.fulfilled]: (state, action) => {
      coordinatorsAdapter.upsertOne(state, action.payload);
    },
    [deleteCoordinator.fulfilled]: (state, action) => {
      coordinatorsAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      coordinatorsAdapter.setAll(state, action.payload.coordinators);
    },
  },
});

export default coordinatorsSlice.reducer;
