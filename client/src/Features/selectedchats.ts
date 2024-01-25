import { createSlice } from "@reduxjs/toolkit";
import { ChatsType, userType } from "../ts/configs";

const dummyVal:userType = {
    _id: "",
    name: "",
    email: "",
    pic: "",
}

const initialValue = {
  selectedChat: {
    _id: "",
    chatName: "",
    createdAt: "",
    isGroupChat: false,
    updatedAt: "",
    users: [dummyVal],
  }
};

export const selectedChatSlice = createSlice({
  name: "selectedchat",
  initialState: initialValue,
  reducers: {
    setSelectedChat: (state:any, action) => {
      state.selectedChat = action.payload;
    },

    clearSelectedChat: (state:any) => {
      state.selectedChat = initialValue;
    },
  },
});

export const { setSelectedChat, clearSelectedChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
