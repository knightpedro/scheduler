import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { workersService } from "../services";
import { fetchAll } from "./sharedActions";
import { deleteWorker, createWorker } from "./workers";
import { appointmentTypes } from "../constants";

export const fetchWorkerConflicts = createAsyncThunk(
  "workerConflicts/fetchAll",
  () => workersService.getAllConflicts()
);

export const fetchConflictsByWorkerId = createAsyncThunk(
  "workerConflicts/fetchOne",
  (id) => workersService.getConflictsByWorkerId(id)
);

const workerConflictsAdapter = createEntityAdapter();

const adapterSelectors = workerConflictsAdapter.getSelectors(
  (state) => state.workerConflicts
);

const shapeConflictsByType = (worker) =>
  worker.conflicts.reduce(
    (eventMap, conflict) => {
      const events = [conflict.eventA, conflict.eventB];
      events.forEach((e) => {
        const { id, type } = e;
        eventMap[type].push(id);
      });
      return eventMap;
    },
    {
      [appointmentTypes.JOB_TASK]: [],
      [appointmentTypes.LEAVE]: [],
      [appointmentTypes.TRAINING]: [],
    }
  );

const selectConflictMapForWorker = (state, id) => {
  const worker = adapterSelectors.selectById(state, id);
  return shapeConflictsByType(worker);
};

const selectWorkersConflictMap = (state) => {
  const conflicts = adapterSelectors.selectAll(state);
  return conflicts.reduce((workerMap, worker) => {
    workerMap[worker.id] = shapeConflictsByType(worker);
    return workerMap;
  }, {});
};

export const workerConflictsSelectors = {
  ...adapterSelectors,
  selectConflictMapForWorker,
  selectWorkersConflictMap,
};

const workerConflictsSlice = createSlice({
  name: "workerConflicts",
  initialState: workerConflictsAdapter.getInitialState(),
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      workerConflictsAdapter.setAll(state, action.payload.workerConflicts);
    },
    [fetchWorkerConflicts.fulfilled]: (state, action) => {
      workerConflictsAdapter.setAll(state, action.payload);
    },
    [fetchConflictsByWorkerId.fulfilled]: (state, action) => {
      workerConflictsAdapter.upsertOne(state, action.payload);
    },
    [createWorker.fulfilled]: (state, action) => {
      workerConflictsAdapter.addOne(state, {
        id: action.payload.id,
        conflicts: [],
      });
    },
    [deleteWorker.fulfilled]: (state, action) =>
      workerConflictsAdapter.removeOne(state, action.payload),
  },
});

export default workerConflictsSlice.reducer;
