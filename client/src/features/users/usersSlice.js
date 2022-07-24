import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignUpUser } from "../../api/constants";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        userSignIn: {},
        userSignUp: {},
        loading: false,
        error: "",
        signIn: false,
        viewer: {}
    },
    reducers: {
        signIn: (state, action) => {
            state.userSignIn.push(action.payload)
        },
        signUp: (state, action) => {
            state.userSignUp = action.payload;
        },
        stateSignIn: (state, action) => {
            state.signIn = action.payload;
        },
        viewerHistory: (state, action) => {
            state.viewer.push(action.payload)
        },
        infoLogin: (state, action) => {

            state.userSignIn = action.payload;
        }
    },

});

export const { signIn, signUp, stateSignIn, viewerHistory, infoLogin } = usersSlice.actions
export default usersSlice.reducer
