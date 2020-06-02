import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { jobsService } from "../services";
import { fetchAll } from "./combined";
import moment from "moment";
import { DATE_FORMAT } from "../api/constants";

const transformDatesToMoments = (job) => ({
  ...job,
  dateReceived: job.dateReceived ? moment(job.dateReceived) : null,
  dateScheduled: job.dateScheduled ? moment(job.dateScheduled) : null,
});

const transformMomentsToDates = (job) => ({
  ...job,
  dateReceived: job.dateReceived ? job.dateReceived.format(DATE_FORMAT) : null,
  dateScheduled: job.dateScheduled
    ? job.dateScheduled.format(DATE_FORMAT)
    : null,
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

export const jobsSelectors = {
  selectAll: (state) =>
    adapterSelectors
      .selectAll(state)
      .map((job) => transformDatesToMoments(job)),
  selectById: (state, id) => {
    const entity = adapterSelectors.selectById(state, id);
    if (entity) return transformDatesToMoments(entity);
    return undefined;
  },
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