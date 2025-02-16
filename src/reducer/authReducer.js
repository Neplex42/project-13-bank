import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../services/auth/authService.js'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  error: null,
  success: false,
  userInfo: null,
  userToken
}

// Login user
export const login
  = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (token, thunkAPI) => {
    try {
      return await authService.getUserProfile(token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('userToken')
        state.loading = false
        state.userInfo = null
        state.userToken = null
        state.error = null
        state.success = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.userToken = action.payload.body.token
        state.success = true
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.success = true
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer