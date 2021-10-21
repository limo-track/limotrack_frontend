import { createSlice } from "@reduxjs/toolkit";

export const login = createSlice({
  name: "login",
  initialState: {
    user: null,
    lang: 0
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null
    },
    setLang: (state, action) => {
      state.lang = action.payload
    }
  }
})

export const { setUser, logout, setLang} = login.actions
export default login.reducer