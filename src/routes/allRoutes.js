import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Users from "../pages/users/users";
import User from "../pages/users/user";
import Accounts from "../pages/accounts/accounts"
import Account from "../pages/accounts/account"
import Groups from "../pages/groups/groups"
import Group from "../pages/groups/group"
import Devices from "../pages/devices/devices"
import Device from "../pages/devices/device"
import Cars from "../pages/cars/cars";
import CarForm from "../pages/cars/carForm";
import Drivers from "../pages/drivers/drivers";
import Paths from "../pages/pathes/paths";
import CarDashboard from "../pages/cars/carDashboard";
import FuelReport from "../pages/reports/fuelReport";
import Driver from "../pages/drivers/driver"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/devices", component: Devices },
  { path: "/device", component: Device },
  { path: "/users", component: Users },
  { path: "/user", component: User },
  { path: "/accounts", component: Accounts },
  { path: "/account", component: Account },
  { path: "/groups", component: Groups },
  { path: "/group", component: Group },
  { path: "/cars", component: Cars },
  { path: "/carForm", component: CarForm },
  { path: "/drivers", component: Drivers },
  { path: "/driver", component: Driver },
  { path: "/paths", component: Paths },
  {path: "/cars-dashboard", component: CarDashboard},
  {path: "/fuel-report", component: FuelReport},


  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register }
]

export { userRoutes, authRoutes }
