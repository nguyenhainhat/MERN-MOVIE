import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignUpUser } from "../../api/constants";

export const updateSeasonSlice = createSlice({
  name: "updateSeason",
  initialState: {
    tv: null
  },
  reducers: {
    detailTvAdd: (state, action) => {
      state.tv = action.payload;
    },
  },
});

export const { detailTvAdd } = updateSeasonSlice.actions;
export default updateSeasonSlice.reducer;
