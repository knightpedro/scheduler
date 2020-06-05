import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { jobTasksService } from "../services";
import { fetchAll } from "./combined";
import {
  transformDatesToMoments,
  transformMomentsToDates,
} from "../utils/appointments";
import moment from "moment";
import { fetchWorkerConflicts } from "./workerConflicts";
import { fetchResourceConflicts } from "./resourceConflicts";

export const fetchJobTasks = createAsyncThunk("jobTasks/fetchAll", () =>
  jobTasksService.getAll()
);

export const fetchJobTaskById = createAsyncThunk("jobTasks/fetchOne", (id) =>
  jobTasksService.getById(id)
);

export const createJobTask = createAsyncThunk(
  "jobTasks/create",
  async (values) => {
    const jobTask = transformMomentsToDates(values);
    const id = await jobTasksService.create(jobTask);
    return { id, ...jobTask };
  }
);

export const updateJobTask = createAsyncThunk(
  "jobTasks/update",
  async (values, { dispatch }) => {
    const jobTask = transformMomentsToDates(values);
    await jobTasksService.edit(jobTask);
    dispatch(fetchResourceConflicts());
    dispatch(fetchWorkerConflicts());
    return jobTask;
  }
);

export const deleteJobTask = createAsyncThunk(
  "jobTasks/delete",
  async (id, { dispatch }) => {
    await jobTasksService.destroy(id);
    dispatch(fetchResourceConflicts());
    dispatch(fetchWorkerConflicts());
    return id;
  }
);

const jobTasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = jobTasksAdapter.getSelectors(
  (state) => state.jobTasks
);

export const jobTaskSelectors = {
  selectAll: (state) =>
    adapterSelectors.selectAll(state).map((j) => transformDatesToMoments(j)),
  selectById: (state, id) => {
    const entity = adapterSelectors.selectById(state, id);
    if (entity) return transformDatesToMoments(entity);
    return undefined;
  },
};

const jobTasksSlice = createSlice({
  name: "jobTasks",
  initialState: jobTasksAdapter.getInitialState(),
  extraReducers: {
    [fetchJobTasks.fulfilled]: (state, action) => {
      jobTasksAdapter.setAll(state, action.payload);
    },
    [fetchJobTaskById.fulfilled]: (state, action) => {
      jobTasksAdapter.upsertOne(state, action.payload);
    },
    [createJobTask.fulfilled]: (state, action) => {
      jobTasksAdapter.addOne(state, action.payload);
    },
    [updateJobTask.fulfilled]: (state, action) => {
      jobTasksAdapter.upsertOne(state, action.payload);
    },
    [deleteJobTask.fulfilled]: (state, action) => {
      jobTasksAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      const jobTasks = action.payload.jobTasks.map((jobTask) => {
        const { resources, workers, ...remainder } = jobTask;
        return remainder;
      });
      jobTasksAdapter.setAll(state, jobTasks);
    },
  },
});

export default jobTasksSlice.reducer;
