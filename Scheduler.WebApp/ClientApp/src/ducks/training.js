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
  async (values) => {
    const training = transformMomentsToDates(values);
    const id = await trainingService.create(training);
    return { id, ...training };
  }
);

export const updateTraining = createAsyncThunk(
  "training/update",
  async (values, { dispatch }) => {
    const training = transformMomentsToDates(values);
    await trainingService.edit(training);
    dispatch(fetchWorkerConflicts());
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
