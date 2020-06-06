import { createReducer } from "@reduxjs/toolkit";
import { fetchAll } from "./sharedActions";
import { deleteTraining, assignWorkersToTraining } from "./training";
import { deleteWorker } from "./workers";

export default createReducer([], {
  [assignWorkersToTraining.fulfilled]: (state, action) => {
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
