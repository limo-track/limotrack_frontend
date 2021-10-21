import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {setUser} from "../../store/auth/login/reducer";

const Logout = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    localStorage.removeItem('group');

    props.history.replace('/');
    dispatch(setUser({}))
  })

  return <></>
}

export default Logout;