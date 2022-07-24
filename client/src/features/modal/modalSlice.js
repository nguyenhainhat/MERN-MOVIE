import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignUpUser } from "../../api/constants";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
      activeModal: false,
    },
    reducers: {
        stateModal: (state, action) => {
            state.activeModal = action.payload;
        },
    },

});

export const { stateModal } = modalSlice.actions
export default modalSlice.reducer
