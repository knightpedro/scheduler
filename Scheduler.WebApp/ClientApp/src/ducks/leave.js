import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { leaveService } from "../services";
import { fetchAll } from "./combined";
import {
  transformDatesToMoments,
  transformMomentsToDates,
} from "../utils/appointments";
import moment from "moment";
import { fetchConflictsByWorkerId } from "./workerConflicts";

export const fetchLeave = createAsyncThunk("leave/fetchAll", () =>
  leaveService.getAll()
);

export const fetchLeaveById = createAsyncThunk("leave/fetchOne", (id) =>
  leaveService.getById(id)
);

export const createLeave = createAsyncThunk(
  "leave/create",
  async (values, { dispatch }) => {
    const leave = transformMomentsToDates(values);
    const id = await leaveService.create(leave);
    dispatch(fetchConflictsByWorkerId(id));
    return { id, ...leave };
  }
);

export const updateLeave = createAsyncThunk(
  "leave/update",
  async (values, { dispatch }) => {
    const leave = transformMomentsToDates(values);
    await leaveService.edit(transformMomentsToDates(leave));
    dispatch(fetchConflictsByWorkerId(leave.id));
    return leave;
  }
);

export const deleteLeave = createAsyncThunk(
  "leave/delete",
  async (id, { dispatch }) => {
    await leaveService.destroy(id);
    dispatch(fetchConflictsByWorkerId(id));
    return id;
  }
);

const leaveAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = leaveAdapter.getSelectors((state) => state.leave);

export const leaveSelectors = {
  selectAll: (state) =>
    adapterSelectors.selectAll(state).map((l) => transformDatesToMoments(l)),
  selectById: (state, id) => {
    const entity = adapterSelectors.selectById(state, id);
    if (entity) return transformDatesToMoments(entity);
    return undefined;
  },
  selectByWorker: (state, workerId) =>
    adapterSelectors
      .selectAll(state)
      .filter((l) => l.workerId === workerId)
      .map((l) => transformDatesToMoments(l)),
};

const leaveSlice = createSlice({
  name: "leave",
  initialState: { ...leaveAdapter.getInitialState(), types: [] },
  reducers: {},
  extraReducers: {
    [createLeave.fulfilled]: (state, action) => {
      leaveAdapter.addOne(state, action.payload);
    },
    [deleteLeave.fulfilled]: (state, action) => {
      leaveAdapter.removeOne(state, action.payload);
    },
    [fetchLeave.fulfilled]: (state, action) => {
      leaveAdapter.setAll(state, action.payload);
    },
    [fetchLeaveById.fulfilled]: (state, action) => {
      leaveAdapter.upsertOne(state, action.payload);
    },
    [updateLeave.fulfilled]: (state, action) => {
      leaveAdapter.upsertOne(state, action.payload);
    },
    [fetchAll.fulfilled]: (state, action) => {
      const { leave, leaveTypes } = action.payload;
      leaveAdapter.setAll(state, leave);
      state.types = leaveTypes.sort();
    },
  },
});

export default leaveSlice.reducer;
