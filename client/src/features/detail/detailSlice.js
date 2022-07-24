import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignUpUser } from "../../api/constants";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detailItemss: [],
    abc: null,
  },
  reducers: {
    detailItemAdd: (state, action) => {
      state.detailItemss.push(action.payload);
    },
    detailItemRemove: (state, action) => {
      state.detailItemss = action.payload;
    },
  },
});

export const { detailItemAdd, detailItemRemove } = detailSlice.actions;
export default detailSlice.reducer;
