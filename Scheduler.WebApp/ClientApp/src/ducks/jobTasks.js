import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { jobTasksService } from "../services";
import {
  transformDatesToMoments,
  transformMomentsToDates,
} from "../utils/appointments";
import moment from "moment";
import { fetchAll } from "./sharedActions";
import { fetchResourceConflicts } from "./resourceConflicts";
import { fetchWorkerConflicts } from "./workerConflicts";

export const fetchJobTasks = createAsyncThunk("jobTasks/fetchAll", () =>
  jobTasksService.getAll()
);

export const fetchJobTaskById = createAsyncThunk("jobTasks/fetchOne", (id) =>
  jobTasksService.getById(id)
);

export const createJobTask = createAsyncThunk(
  "jobTasks/create",
  async (values, { dispatch }) => {
    const { resources, workers, ...remainder } = values;
    const jobTask = transformMomentsToDates(remainder);
    const id = await jobTasksService.create(jobTask);
    dispatch(assignResourcesToJobTask({ jobTaskId: id, resources }));
    dispatch(assignWorkersToJobTask({ jobTaskId: id, workers }));
    return { id, ...jobTask };
  }
);

export const updateJobTask = createAsyncThunk(
  "jobTasks/update",
  async (values, { dispatch }) => {
    const { resources, workers, ...remainder } = values;
    const jobTask = transformMomentsToDates(remainder);
    await jobTasksService.edit(jobTask);
    dispatch(assignResourcesToJobTask({ jobTaskId: jobTask.id, resources }));
    dispatch(assignWorkersToJobTask({ jobTaskId: jobTask.id, workers }));
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

export const assignResourcesToJobTask = createAsyncThunk(
  "jobTasks/assignResources",
  async ({ jobTaskId, resources }, { dispatch, getState }) => {
    const state = getState();
    const oldResources = selectResourcesByJobTask(state, jobTaskId);
    const add = resources.filter((r) => !oldResources.includes(r));
    const remove = oldResources.filter((r) => !resources.includes(r));
    const patch = { add, remove };
    await jobTasksService.patchResources(jobTaskId, patch);
    dispatch(fetchResourceConflicts());
    return { jobTaskId, add, remove };
  }
);

export const assignWorkersToJobTask = createAsyncThunk(
  "jobTasks/assignWorkers",
  async ({ jobTaskId, workers }, { dispatch, getState }) => {
    const state = getState();
    const oldWorkers = selectWorkersByJobTask(state, jobTaskId);
    const add = workers.filter((w) => !oldWorkers.includes(w));
    const remove = oldWorkers.filter((w) => !workers.includes(w));
    const patch = { add, remove };
    await jobTasksService.patchWorkers(jobTaskId, patch);
    dispatch(fetchWorkerConflicts());
    return { jobTaskId, add, remove };
  }
);

const selectJobTasksByResource = (state, id) =>
  state.resourceJobTasks
    .filter((j) => j.resourceId === id)
    .map((j) => j.jobTaskId);

const selectResourcesByJobTask = (state, id) =>
  state.resourceJobTasks
    .filter((j) => j.jobTaskId === id)
    .map((j) => j.resourceId);

export const resourceJobTaskSelectors = {
  selectJobTasksByResource,
  selectResourcesByJobTask,
};

const selectJobTasksByWorker = (state, id) =>
  state.workerJobTasks.filter((j) => j.workerId === id).map((j) => j.jobTaskId);

const selectWorkersByJobTask = (state, id) =>
  state.workerJobTasks.filter((j) => j.jobTaskId === id).map((j) => j.workerId);

export const workerJobTaskSelectors = {
  selectJobTasksByWorker,
  selectWorkersByJobTask,
};

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
