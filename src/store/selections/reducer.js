import { createSlice } from "@reduxjs/toolkit";

export const selections = createSlice({
  name: "selection",
  initialState: {
    account: null,
    group: null,
    driver: null,
    car: null,
    path: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload
    },
    setGroup: (state, action) => {
      state.group = action.payload
    },
    setDriver: (state, action) => {
      state.driver = action.payload
    },
    setCar: (state, action) => {
      state.car = action.payload
    },
    setPath: (state, action) => {
      state.path = action.payload
    },
  }
})

export const { setAccount, setGroup, setDriver, setCar, setPath} = selections.actions
export default selections.reducer