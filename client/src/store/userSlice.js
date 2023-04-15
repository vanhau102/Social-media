import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    jwt: '',
    currentUser: {},
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.currentUser = action.payload.currentUser;
            state.jwt = action.payload.jwt;
            state.isLoggedIn = true;
            state.loading = false;
        },
        loginFailed(state) {
            state.loading = false;
            state.error = true;
        },
        replaceUserData(state, action) {
            state.currentUser = action.payload;
        },
    }
})

export const { loginStart, loginSuccess, loginFailed, replaceUserData } = userSlice.actions

export default userSlice.reducer