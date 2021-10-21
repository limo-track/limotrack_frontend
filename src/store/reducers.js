import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

import selections from './selections/reducer';

const rootReducer = combineReducers({
  Layout,
  Login,
  selections
})

export default rootReducer
