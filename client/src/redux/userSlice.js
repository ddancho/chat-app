import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    lastOpenConversation: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.userInfo = Object.assign({}, action.payload.userInfo);
      state.lastOpenConversation = Object.assign({}, action.payload.lastOpenConversation);
    },
    updateUserConversation: (state, action) => {
      state.lastOpenConversation = Object.assign({}, action.payload);
    },
  },
});

export default slice.reducer;

export const { getUser, updateUserConversation } = slice.actions;
