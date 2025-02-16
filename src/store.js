import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./reducer/authReducer.js";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true
})