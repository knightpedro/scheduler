import { createAsyncThunk } from "@reduxjs/toolkit";
import { combinedService } from "../services";

export const fetchAll = createAsyncThunk("combined/fetchAll", () =>
  combinedService.getAll()
);
