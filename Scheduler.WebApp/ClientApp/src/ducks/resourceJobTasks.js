import { createReducer } from "@reduxjs/toolkit";
import { fetchAll } from "./sharedActions";
import { assignResourcesToJobTask, deleteJobTask } from "./jobTasks";
import { deleteResource } from "./resources";

export default createReducer([], {
  [assignResourcesToJobTask.fulfilled]: (state, action) => {
    const { jobTaskId, add, remove } = action.payload;
    return state
      .filter(
        (rt) => rt.jobTaskId !== jobTaskId || !remove.includes(rt.resourceId)
      )
      .concat(add.map((resourceId) => ({ jobTaskId, resourceId })));
  },
  [fetchAll.fulfilled]: (state, action) =>
    action.payload.jobTasks.reduce(
      (resourceTasks, jobTask) =>
        resourceTasks.concat(
          jobTask.resources.map((resourceId) => ({
            jobTaskId: jobTask.id,
            resourceId,
          }))
        ),
      []
    ),
  [deleteJobTask.fulfilled]: (state, action) =>
    state.filter((rt) => rt.jobTaskId !== action.payload),
  [deleteResource.fulfilled]: (state, action) =>
    state.filter((rt) => rt.resourceId !== action.payload),
});
