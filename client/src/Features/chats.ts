import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { ChatsType } from "../ts/configs";

const initialValue: ChatsType[] = [
  {
    _id: "",
    chatName: "",
    createdAt: "",
    isGroupChat: false,
    updatedAt: "",
    users: [
      {
        _id: "",
        name: "",
        pic: "",
        email: "",
      },
    ],
  },
];

export const chats = createSlice({
  name: "chats",
  initialState: initialValue,
  reducers: {
    setChats: (state, action: PayloadAction<ChatsType[]>) => {
      return action.payload
    },

    clearChats: (state:any) => {
      return initialValue;
    },
  },
});

export const { setChats, clearChats } = chats.actions;

export default chats.reducer;
