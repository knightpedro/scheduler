import { createReducer } from "@reduxjs/toolkit";
import { fetchAll } from "./sharedActions";
import { deleteJobTask, assignWorkersToJobTask } from "./jobTasks";
import { deleteWorker } from "./workers";

export default createReducer([], {
  [assignWorkersToJobTask.fulfilled]: (state, action) => {
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
