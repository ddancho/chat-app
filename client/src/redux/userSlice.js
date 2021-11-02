import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    setIsError: (state) => {
      state.isError = true;
      state.isLoading = false;
      state.userInfo = [];
    },
    getUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export default slice.reducer;

export const { getUser, setIsError, setIsLoading } = slice.actions;
