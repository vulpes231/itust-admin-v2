import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";

import UserProfile from "../pages/Authentication/user-profile";
import DashboardAnalytics from "../pages/DashboardAnalytics";
import {
  Admins,
  EditUser,
  ManageSettings,
  Plans,
  Positions,
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
  { path: "/settings", component: <ManageSettings /> },
  { path: "/positions", component: <Positions /> },
  // { path: "/settings", component: <ManageSettings /> },
  { path: "/edituser/:userId", component: <EditUser /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
];

export { authProtectedRoutes, publicRoutes };
