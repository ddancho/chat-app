import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    lastOpenConversation: {},
    msgInfo: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.userInfo = Object.assign({}, action.payload.userInfo);
      state.lastOpenConversation = Object.assign({}, action.payload.lastOpenConversation);
    },
    updateUserConversation: (state, action) => {
      state.lastOpenConversation = Object.assign({}, action.payload);
    },
    updateMsg: (state, action) => {
      state.msgInfo = Object.assign({}, action.payload);
    },
  },
});

export default slice.reducer;

export const { getUser, updateUserConversation, updateMsg } = slice.actions;
