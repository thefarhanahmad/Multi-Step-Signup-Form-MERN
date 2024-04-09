import { createSlice } from "@reduxjs/toolkit";

const data = {
  token: localStorage.getItem("JWTtoken") || null,
  step: 2,
  user: null,
  avatar:localStorage.getItem("avatar") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState: data,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
    nextStep: (state, action) => {
      state.step += 1;
    },
    prevStep: (state, action) => {
      state.step -= 1;
    },
   
  },
});

export const {
  setToken,
  removeToken,
  setUser,
  removeUser,
  nextStep,
  prevStep,
} = authSlice.actions;

export default authSlice.reducer;
