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
import { appointmentTypes } from "../constants";

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
    const oldResources = selectResourceIdsByJobTask(state, jobTaskId);
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
    const oldWorkers = selectWorkerIdsByJobTask(state, jobTaskId);
    const add = workers.filter((w) => !oldWorkers.includes(w));
    const remove = oldWorkers.filter((w) => !workers.includes(w));
    const patch = { add, remove };
    await jobTasksService.patchWorkers(jobTaskId, patch);
    dispatch(fetchWorkerConflicts());
    return { jobTaskId, add, remove };
  }
);

const jobTasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = jobTasksAdapter.getSelectors(
  (state) => state.jobTasks
);

const selectAll = (state) =>
  adapterSelectors.selectAll(state).map((j) => transformDatesToMoments(j));

const selectById = (state, id) => {
  const entity = adapterSelectors.selectById(state, id);
  if (entity) return transformDatesToMoments(entity);
  return undefined;
};

const selectByJob = (state, jobId) =>
  selectAll(state).filter((j) => j.jobId === jobId);

const selectJobTaskWithEntities = (state, id) => {
  const jobTask = jobTaskSelectors.selectById(state, id);
  if (!jobTask) return;
  const workers = selectWorkerIdsByJobTask(state, id);
  const resources = selectResourceIdsByJobTask(state, id);
  return { ...jobTask, workers, resources };
};

export const jobTaskSelectors = {
  selectAll,
  selectById,
  selectByJob,
  selectJobTaskWithEntities,
};

const shapeJobTaskToEvent = (jobTask, conflicts) => ({
  id: jobTask.id,
  type: appointmentTypes.JOB_TASK,
  description: jobTask.description,
  start: jobTask.start,
  end: jobTask.end,
  isConflicting: conflicts[appointmentTypes.JOB_TASK].includes(jobTask.id),
});

const selectJobTaskIdsByResource = (state, id) =>
  state.resourceJobTasks
    .filter((j) => j.resourceId === id)
    .map((j) => j.jobTaskId);

const selectResourceIdsByJobTask = (state, id) =>
  state.resourceJobTasks
    .filter((j) => j.jobTaskId === id)
    .map((j) => j.resourceId);

const selectJobTasksForResource = (state, id) =>
  selectJobTaskIdsByResource(state, id).map((jobTaskId) =>
    selectById(state, jobTaskId)
  );

const selectEventsForResource = (state, resourceId, conflicts) =>
  selectJobTasksForResource(state, resourceId).map((j) =>
    shapeJobTaskToEvent(j, conflicts)
  );

export const resourceJobTaskSelectors = {
  selectJobTaskIdsByResource,
  selectResourceIdsByJobTask,
  selectEventsForResource,
};

const selectJobTaskIdsByWorker = (state, id) =>
  state.workerJobTasks.filter((j) => j.workerId === id).map((j) => j.jobTaskId);

const selectWorkerIdsByJobTask = (state, id) =>
  state.workerJobTasks.filter((j) => j.jobTaskId === id).map((j) => j.workerId);

const selectJobTasksForWorker = (state, workerId) =>
  selectJobTaskIdsByWorker(state, workerId).map((jobTaskId) =>
    selectById(state, jobTaskId)
  );

const selectEventsForWorker = (state, workerId, conflicts) =>
  selectJobTasksForWorker(state, workerId).map((j) =>
    shapeJobTaskToEvent(j, conflicts)
  );

export const workerJobTaskSelectors = {
  selectJobTasksForWorker,
  selectJobTaskIdsByWorker,
  selectEventsForWorker,
  selectWorkerIdsByJobTask,
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
