import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { jobsService } from "../services";
import { fetchAll } from "./sharedActions";
import moment from "moment";
import { coordinatorsSelectors } from "./coordinators";
import { jobTaskSelectors } from "./jobTasks";

const transformDatesToMoments = (job) => ({
  ...job,
  dateReceived: job.dateReceived ? moment(job.dateReceived) : null,
  dateScheduled: job.dateScheduled ? moment(job.dateScheduled) : null,
});

const transformMomentsToDates = (job) => ({
  ...job,
  dateReceived: job.dateReceived ? job.dateReceived.format() : null,
  dateScheduled: job.dateScheduled ? job.dateScheduled.format() : null,
});

export const fetchJobs = createAsyncThunk("jobs/fetchAll", () =>
  jobsService.getAll()
);

export const fetchJobById = createAsyncThunk("jobs/fetchOne", (id) =>
  jobsService.getById(id)
);

export const createJob = createAsyncThunk("jobs/create", async (values) => {
  const job = transformMomentsToDates(values);
  const id = await jobsService.create(job);
  return { id, ...job };
});

export const updateJob = createAsyncThunk("jobs/update", async (values) => {
  const job = transformMomentsToDates(values);
  await jobsService.edit(job);
  return job;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  await jobsService.destroy(id);
  return id;
});

const jobsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.jobNumber.localeCompare(b.jobNumber),
});

const adapterSelectors = jobsAdapter.getSelectors((state) => state.jobs);

const selectAll = (state) =>
  adapterSelectors.selectAll(state).map((job) => transformDatesToMoments(job));

const selectFiltered = (state, filter) => {
  const jobs = selectAll(state);
  if (!filter) return jobs;
  return jobs.filter(
    (j) =>
      j.description.toLowerCase().includes(filter.toLowerCase()) ||
      j.jobNumber.toLowerCase().includes(filter.toLowerCase())
  );
};

const selectByCoordinator = (state, coordinatorId) =>
  selectAll(state).filter((job) => job.coordinatorId === coordinatorId);

const selectById = (state, id) => {
  const entity = adapterSelectors.selectById(state, id);
  if (entity) return transformDatesToMoments(entity);
  return undefined;
};

const selectActive = (state) => selectAll(state).filter((j) => !j.isComplete);

const selectAllWithCoordinator = (state) =>
  selectAll(state).map((job) => ({
    ...job,
    coordinator: coordinatorsSelectors.selectById(state, job.coordinatorId),
  }));

const selectJobWithEntities = (state, id) => {
  const job = selectById(state, id);
  if (job) {
    job.coordinator = coordinatorsSelectors.selectById(
      state,
      job.coordinatorId
    );
    job.jobTasks = jobTaskSelectors.selectByJob(state, job.id);
  }
  return job;
};

const selectOptions = (state) =>
  selectActive(state).map((j) => ({
    text: `${j.jobNumber} - ${j.description}`,
    value: j.id,
  }));

export const jobsSelectors = {
  ...adapterSelectors,
  selectAll,
  selectAllWithCoordinator,
  selectByCoordinator,
  selectById,
  selectFiltered,
  selectJobWithEntities,
  selectActive,
  selectOptions,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState: jobsAdapter.getInitialState(),
  extraReducers: {
    [fetchJobs.fulfilled]: (state, action) => {
      jobsAdapter.setAll(state, action.payload);
    },
    [fetchJobById.fulfilled]: (state, action) => {
      jobsAdapter.upsertOne(state, action.payload);
    },
    [createJob.fulfilled]: (state, action) => {
      jobsAdapter.addOne(state, action.payload);
    },
    [updateJob.fulfilled]: (state, action) => {
      jobsAdapter.upsertOne(state, action.payload);
    },
    [deleteJob.fulfilled]: (state, action) => {
      jobsAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      jobsAdapter.setAll(state, action.payload.jobs);
    },
  },
});

export default jobsSlice.reducer;
