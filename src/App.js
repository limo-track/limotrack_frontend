import PropTypes from 'prop-types'
import React, {useEffect} from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import {useSelector, useDispatch} from "react-redux";
import {setUser, setLang} from "./store/auth/login/reducer";
import {setAccount, setGroup} from "./store/selections/reducer"

const App = props => {
  const user = useSelector(state=>state.Login.user);

  const dispatch = useDispatch();
  if(!user){
    const _user = JSON.parse(localStorage.getItem('authUser'));
    dispatch(setUser(_user));
  }
  let _lang = localStorage.getItem('lang');
  if(!_lang) {
    _lang = "en"
    localStorage.setItem('lang', _lang)
  }
  dispatch(setLang(_lang));

  const account = localStorage.getItem('account');
  const group = localStorage.getItem('group');

  dispatch(setAccount(JSON.parse(account)));
  dispatch(setGroup(JSON.parse(group)));

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }
  const Layout = getLayout()

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
