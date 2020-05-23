import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { workersService } from "../services";

export const fetchWorkers = createAsyncThunk("workers/fetchAll", () =>
  workersService.getAll()
);

const workersAdapter = createEntityAdapter();

export const workersSelectors = workersAdapter.getSelectors(
  (state) => state.workers
);

const workersSlice = createSlice({
  name: "workers",
  initialState: workersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchWorkers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchWorkers.fulfilled]: (state, action) => {
      workersAdapter.setAll(state, action.payload);
      state.loading = false;
    },
    [fetchWorkers.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default workersSlice.reducer;
