import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    lastOpenConversation: {},
    msgInfo: {},
    usersOnline: [],
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
    updateUsersOnline: (state, action) => {
      state.usersOnline = action.payload && action.payload.length > 0 ? [...action.payload] : [];
    },
    updateUserNewUpload: (state, action) => {
      state.userInfo["profilePicture"] = action.payload.profilePicture;
    },
  },
});

export default slice.reducer;

export const { getUser, updateUserConversation, updateMsg, updateUsersOnline, updateUserNewUpload } =
  slice.actions;
