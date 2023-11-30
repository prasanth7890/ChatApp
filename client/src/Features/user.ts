import { createSlice } from "@reduxjs/toolkit";

const initialValue = {};


export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialValue,
  reducers: {
    login: (state:any, action) => {
      state.value = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.value));
    },

    logout: (state:any) => {
      state.value = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
