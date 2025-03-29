import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../services/auth/authService.js'

// initialize userToken from local storage or session storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : sessionStorage.getItem('userToken')
  ? sessionStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  error: null,
  success: false,
  userInfo: null,
  userToken,
}

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const result = await authService.login(user)
    if (result && result.error === true) {
      return thunkAPI.rejectWithValue(result)
    }
    return result
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (token, thunkAPI) => {
    try {
      return await authService.getUserProfile(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userData, token }, thunkAPI) => {
    try {
      return await authService.updateUserProfile(userData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('userToken')
        sessionStorage.removeItem('userToken')
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
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.success = true
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
