import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { trainingService } from "../services";
import { fetchAll } from "./sharedActions";
import { fetchWorkerConflicts } from "./workerConflicts";
import {
  transformDatesToMoments,
  transformMomentsToDates,
} from "../utils/appointments";
import moment from "moment";

export const fetchTraining = createAsyncThunk("training/fetchAll", () =>
  trainingService.getAll()
);

export const fetchTrainingById = createAsyncThunk("training/fetchOne", (id) =>
  trainingService.getById(id)
);

export const createTraining = createAsyncThunk(
  "training/create",
  async (values, { dispatch }) => {
    const { workers, ...remainder } = values;
    const training = transformMomentsToDates(remainder);
    const id = await trainingService.create(training);
    dispatch(assignWorkersToTraining({ trainingId: id, workers }));
    return { id, ...training };
  }
);

export const updateTraining = createAsyncThunk(
  "training/update",
  async (values, { dispatch }) => {
    const { workers, ...remainder } = values;
    const training = transformMomentsToDates(remainder);
    await trainingService.edit(training);
    dispatch(assignWorkersToTraining({ trainingId: training.id, workers }));
    return training;
  }
);

export const deleteTraining = createAsyncThunk(
  "training/delete",
  async (id, { dispatch }) => {
    await trainingService.destroy(id);
    dispatch(fetchWorkerConflicts());
    return id;
  }
);

export const assignWorkersToTraining = createAsyncThunk(
  "training/assignWorkers",
  async ({ trainingId, workers }, { dispatch, getState }) => {
    const state = getState();
    const oldWorkers = selectWorkersByTraining(state, trainingId);
    const remove = oldWorkers.filter((w) => !workers.includes(w));
    const add = workers.filter((w) => !oldWorkers.includes(w));
    const patch = { add, remove };
    await trainingService.patchWorkers(trainingId, patch);
    dispatch(fetchWorkerConflicts());
    return { trainingId, add, remove };
  }
);

const trainingAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = trainingAdapter.getSelectors(
  (state) => state.training
);

export const trainingSelectors = {
  selectAll: (state) =>
    adapterSelectors.selectAll(state).map((t) => transformDatesToMoments(t)),
  selectById: (state, id) => {
    const entity = adapterSelectors.selectById(state, id);
    if (entity) return transformDatesToMoments(entity);
    return undefined;
  },
};

const selectTrainingByWorker = (state, id) =>
  state.workerTraining
    .filter((wt) => wt.workerId === id)
    .map((wt) => wt.trainingId);

const selectWorkersByTraining = (state, id) =>
  state.workerTraining
    .filter((wt) => wt.trainingId === id)
    .map((wt) => wt.workerId);

export const workerTrainingSelectors = {
  selectTrainingByWorker,
  selectWorkersByTraining,
};

const trainingSlice = createSlice({
  name: "training",
  initialState: trainingAdapter.getInitialState(),
  extraReducers: {
    [fetchTraining.fulfilled]: (state, action) => {
      trainingAdapter.setAll(state, action.payload);
    },
    [fetchTrainingById.fulfilled]: (state, action) => {
      trainingAdapter.upsertOne(state, action.payload);
    },
    [createTraining.fulfilled]: (state, action) => {
      trainingAdapter.addOne(state, action.payload);
    },
    [updateTraining.fulfilled]: (state, action) => {
      trainingAdapter.upsertOne(state, action.payload);
    },
    [deleteTraining.fulfilled]: (state, action) => {
      trainingAdapter.removeOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      const training = action.payload.training.map((t) => {
        const { workers, ...remainder } = t;
        return remainder;
      });
      trainingAdapter.setAll(state, training);
    },
  },
});

export default trainingSlice.reducer;
