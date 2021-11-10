import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    currentConversation: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.userInfo = Object.assign({}, action.payload.userInfo);
      state.currentConversation = Object.assign({}, action.payload.currentConversation);
    },
  },
});

export default slice.reducer;

export const { getUser } = slice.actions;
