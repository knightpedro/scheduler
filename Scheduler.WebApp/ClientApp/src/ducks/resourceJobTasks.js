import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { jobTasksService } from "../services";
import { fetchAll } from "./combined";
import { deleteJobTask } from "./jobTasks";
import { deleteResource } from "./resources";

export const assignResources = createAsyncThunk(
  "resourceJobTasks/assignResources",
  async ({ jobTaskId, resources }, { getState }) => {
    const state = getState();
    const oldResources = state.resourceJobTasks.map((task) => task.resourceId);
    const add = resources.filter((r) => !oldResources.includes(r));
    const remove = oldResources.filter((r) => !resources.includes(r));
    const patch = { add, remove };
    await jobTasksService.patchResources(jobTaskId, patch);
    return { jobTaskId, add, remove };
  }
);

export default createReducer([], {
  [assignResources.fulfilled]: (state, action) => {
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
