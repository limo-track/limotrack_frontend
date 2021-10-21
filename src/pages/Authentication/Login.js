import MetaTags from "react-meta-tags"
import React, {useState} from "react";
import _ from "lodash";
import jwtDecode from "jwt-decode"
import http from "../../services/httpServices"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
import { Link } from "react-router-dom"
import { AvForm, AvField } from "availity-reactstrap-validation"
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import { LOGIN } from "../../helpers/url_helper"
import {setUser} from '../../store/auth/login/reducer';
import {useDispatch} from "react-redux";

const Login = (props) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleValidSubmit = async (event, values) => {
    try {
      const res = await http.post(LOGIN, values)
      const user = jwtDecode(res.data)
      const authUser = _.pick(user, ["id", "user_name", "role", "account",
        "account_id", "group", "group_id", "role", "role_id", 'photo']);

      // save logged user data and token to local storage
      localStorage.setItem("authUser", JSON.stringify(authUser))
      localStorage.setItem("token", res.data.toString());

      // dispatch logged user data and token to redux store
      dispatch(setUser(authUser))
      setError('');
      /*
      * if root redirect to /dashboard
      * first load account details by accountid
      * if account redirect to his account /groups
      * if group or viewer redirect to his group /group
      */
      props.history.replace('/dashboard');

    } catch (e) {
        setError('Invalid email or password')
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>LimoTrack</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to LimoTrack.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {error ? (
                        <Alert color="danger">{error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          //value="admin@themesbrand.com"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          //value="123456"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © LimoTrack {new Date().getFullYear()}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login