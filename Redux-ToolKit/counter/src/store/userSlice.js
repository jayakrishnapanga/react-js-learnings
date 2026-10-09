import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';

const userSlice = createSlice({
  initialState: {
    loggedIn: false,
    userName:"jk"
  },
  name: "user",
  reducers: {
    login: (state, action) => {
      state.name = action.payload;
      state.loggedIn = true;
    //   console.log(state)

    console.log(current(state));
    },
    logout: (state) => {
      state.name = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;


const originalUserReducer = userSlice.reducer;
const wrappedUserReducer = (state, action) => {
  console.log("user reducer invoked with action:", action.type);
  return originalUserReducer(state, action);
};

export default wrappedUserReducer;

