import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { leaveService } from "../services";
import { fetchAll } from "./sharedActions";
import { fetchConflictsByWorkerId } from "./workerConflicts";
import {
  transformDatesToMoments,
  transformMomentsToDates,
  overlaps,
} from "../utils/appointments";
import moment from "moment";
import { appointmentTypes } from "../constants";
import { workersSelectors } from "./workers";

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
    dispatch(fetchConflictsByWorkerId(leave.workerId));
    return { id, ...leave };
  }
);

export const updateLeave = createAsyncThunk(
  "leave/update",
  async (values, { dispatch }) => {
    const leave = transformMomentsToDates(values);
    await leaveService.edit(leave);
    dispatch(fetchConflictsByWorkerId(leave.workerId));
    return leave;
  }
);

export const deleteLeave = createAsyncThunk(
  "leave/delete",
  async (id, { dispatch, getState }) => {
    const state = getState();
    const leave = leaveSelectors.selectById(state, id);
    await leaveService.destroy(id);
    dispatch(fetchConflictsByWorkerId(leave.workerId));
    return id;
  }
);

const leaveAdapter = createEntityAdapter({
  sortComparer: (a, b) => moment(a.start).unix() - moment(b.start).unix(),
});

const adapterSelectors = leaveAdapter.getSelectors((state) => state.leave);

const selectAll = (state) =>
  adapterSelectors.selectAll(state).map((l) => transformDatesToMoments(l));

const selectById = (state, id) => {
  const entity = adapterSelectors.selectById(state, id);
  if (entity) return transformDatesToMoments(entity);
  return undefined;
};

const selectByWorker = (state, workerId) =>
  adapterSelectors
    .selectAll(state)
    .filter((l) => l.workerId === workerId)
    .map((l) => transformDatesToMoments(l));

const selectEventsForWorker = (state, workerId, conflicts) =>
  selectByWorker(state, workerId).map((l) => ({
    id: l.id,
    type: appointmentTypes.LEAVE,
    description: l.leaveType + " Leave",
    start: l.start,
    end: l.end,
    isConflicting: conflicts[appointmentTypes.LEAVE].includes(l.id),
  }));

const selectLeaveTypes = (state) => state.leave.types;

const selectLeaveTypeOptions = (state) =>
  selectLeaveTypes(state).map((l) => ({ text: l, value: l }));

const selectLeaveTakenForPeriod = (state, start, end) => {
  const leave = selectAll(state).filter((leave) => {
    if (moment.isMoment(start) && moment.isMoment(end)) {
      return overlaps(leave, start, end);
    }
    if (moment.isMoment(start)) return leave.end.isAfter(start);
    if (moment.isMoment(end)) return leave.start.isBefore(end);
    return true;
  });

  return workersSelectors.selectAll(state).map((worker) => {
    return {
      ...worker,
      leave: leave.reduce((days, l) => {
        if (l.workerId === worker.id) {
          const start = moment(l.start).startOf("day");
          const end = moment(l.end).add(1, "day").endOf("day");
          return days + Math.max(end.diff(start, "days"), 1);
        }
        return days;
      }, 0),
    };
  });
};

export const leaveSelectors = {
  selectAll,
  selectById,
  selectByWorker,
  selectEventsForWorker,
  selectLeaveTypes,
  selectLeaveTypeOptions,
  selectLeaveTakenForPeriod,
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
