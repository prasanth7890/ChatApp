import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../ts/configs";

const initialValue:userType = {
    _id: "",
    name: "",
    pic: "",
    email: "",
};

export const selectedChatSlice = createSlice({
  name: "selectedchat",
  initialState: initialValue,
  reducers: {
    setSelectedChat: (state:any, action) => {
      state.value = action.payload;
    },

    clearSelectedChat: (state:any) => {
      state.value = initialValue;
    },
  },
});

export const { setSelectedChat, clearSelectedChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
