import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route,
  RouterProvider
} from "react-router-dom";

import Root from "./routes/root";
import Error from "./pages/error/Error.jsx";
import Layout from "./pages/Layout.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import Login from "./pages/login/Login.jsx";

import './styles/main.scss'
import { Provider } from "react-redux";

import store from './store'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} errorElement={<Error />}>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="profile"
              element={<UserPage />}
          />
          <Route path="*" element={<Error />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
)
