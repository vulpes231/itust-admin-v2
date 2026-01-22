import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import UserProfile from "../pages/Authentication/user-profile";
import DashboardAnalytics from "../pages/DashboardAnalytics";
import {
  Admins,
  Plans,
  SavingsAccount,
  Trades,
  Transactions,
  Users,
} from "../pages";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardAnalytics /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/users", component: <Users /> },
  { path: "/trades", component: <Trades /> },
  { path: "/transactions", component: <Transactions /> },
  { path: "/savings-accounts", component: <SavingsAccount /> },
  { path: "/investment-plans", component: <Plans /> },
  { path: "/admins", component: <Admins /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
