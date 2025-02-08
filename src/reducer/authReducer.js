èimport { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../features/auth/authActions.js";

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
  loading: false,
  user: {},
  userToken: null,
  error: null,
  success: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuth = false
      state.user = {}
    }
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, {payload}) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default authSlice.reducer