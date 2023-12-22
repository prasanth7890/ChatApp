import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../ts/configs";

const initialValue: userType = {
  _id: "",
  name: "",
  pic: "",
  email: "",
};


export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialValue,
  reducers: {
    login: (state:any, action) => {
      state.value = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.value));
    },

    logout: (state:any) => {
      state.value = initialValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
