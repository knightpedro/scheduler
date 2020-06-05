import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { trainingService } from "../services";
import { fetchAll } from "./combined";
import { deleteTraining } from "./training";
import { deleteWorker } from "./workers";
import { fetchWorkerConflicts } from "./workerConflicts";

export const assignWorkers = createAsyncThunk(
  "workerTraining/assignWorkers",
  async ({ trainingId, workers }, { dispatch, getState }) => {
    const state = getState();
    const oldWorkers = state.workerTraining.map((wt) => wt.workerId);
    const remove = oldWorkers.filter((w) => !workers.includes(w));
    const add = workers.filter((w) => !oldWorkers.includes(w));
    const patch = { add, remove };
    await trainingService.patchWorkers(trainingId, patch);
    dispatch(fetchWorkerConflicts());
    return { trainingId, add, remove };
  }
);

const selectTrainingByWorker = (state, id) =>
  state.workerTraining
    .filter((wt) => wt.workerId === id)
    .map((wt) => wt.trainingId);

export const workerTrainingSelectors = {
  selectTrainingByWorker,
};

export default createReducer([], {
  [assignWorkers.fulfilled]: (state, action) => {
    const { trainingId, add, remove } = action.payload;
    return state
      .filter(
        (wt) => wt.trainingId !== trainingId || !remove.includes(wt.workerId)
      )
      .concat(add.map((workerId) => ({ trainingId, workerId })));
  },
  [fetchAll.fulfilled]: (state, action) =>
    action.payload.training.reduce(
      (workerTraining, training) =>
        workerTraining.concat(
          training.workers.map((workerId) => ({
            trainingId: training.id,
            workerId,
          }))
        ),
      []
    ),
  [deleteTraining.fulfilled]: (state, action) =>
    state.filter((wt) => wt.trainingId !== action.payload),
  [deleteWorker.fulfilled]: (state, action) =>
    state.filter((wt) => wt.workerId !== action.payload),
});
