import { createSlice } from "@reduxjs/toolkit";

const users = JSON.parse(localStorage.getItem('users')) || []

const initialState = {
    user: users,
    isLoggin: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('users', JSON.stringify(state.user));
        },
        editUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('users', JSON.stringify(state.user));
        },
        logOut: (state, action) => {
            state.user = {};
            state.isLoggedIn = false;
            localStorage.removeItem('users');
        }
    }

})

export const { login, editUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;