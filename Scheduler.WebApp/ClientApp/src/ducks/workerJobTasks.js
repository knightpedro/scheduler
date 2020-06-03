import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { jobTasksService } from "../services";
import { fetchAll } from "./combined";
import { deleteJobTask } from "./jobTasks";
import { deleteWorker } from "./workers";

export const assignWorkers = createAsyncThunk(
  "workerJobTasks/assignWorkers",
  async ({ jobTaskId, workers }, { getState }) => {
    const state = getState();
    const oldWorkers = state.workerJobTasks.map((task) => task.workerId);
    const add = workers.filter((w) => !oldWorkers.includes(w));
    const remove = oldWorkers.filter((w) => !workers.includes(w));
    const patch = { add, remove };
    await jobTasksService.patchWorkers(jobTaskId, patch);
    return { jobTaskId, add, remove };
  }
);

export default createReducer([], {
  [assignWorkers.fulfilled]: (state, action) => {
    const { jobTaskId, add, remove } = action.payload;
    return state
      .filter(
        (wt) => wt.jobTaskId !== jobTaskId || !remove.includes(wt.workerId)
      )
      .concat(add.map((workerId) => ({ jobTaskId, workerId })));
  },
  [fetchAll.fulfilled]: (state, action) =>
    action.payload.jobTasks.reduce(
      (workerTasks, jobTask) =>
        workerTasks.concat(
          jobTask.workers.map((workerId) => ({
            jobTaskId: jobTask.id,
            workerId,
          }))
        ),
      []
    ),
  [deleteJobTask.fulfilled]: (state, action) =>
    state.filter((wt) => wt.jobTaskId !== action.payload),
  [deleteWorker.fulfilled]: (state, action) =>
    state.filter((wt) => wt.workerId !== action.payload),
});
