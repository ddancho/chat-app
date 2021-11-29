import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    lastOpenConversation: {},
    msgInfo: {},
    usersOnline: [],
    users: {
      contacts: [],
      isLoading: false,
      error: null,
    },
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
    getUsersList: (state, action) => {
      if (action.payload.contacts.length > 0) {
        state.users.contacts = [...action.payload.contacts];
      }

      state.users.isLoading = action.payload.isLoadding || false;
      state.users.error = action.payload.error || null;
    },
    updateUsersList: (state, action) => {
      if (action.payload.user) {
        const currentList = state.users.contacts;
        if (!currentList.some((c) => c.id === action.payload.user.id)) {
          state.users.contacts = [...currentList, action.payload.user];
        }
      }
      state.users.isLoading = action.payload.isLoadding || false;
      state.users.error = action.payload.error || null;
    },
  },
});

export default slice.reducer;

export const {
  getUser,
  updateUserConversation,
  updateMsg,
  updateUsersOnline,
  updateUserNewUpload,
  getUsersList,
  updateUsersList,
} = slice.actions;
