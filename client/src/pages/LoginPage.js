// 완전 처음 시작 페이지
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthContext, { useAuth } from "../context/AuthContext";
import "../styles/loginPage.css";
import logo from "../images/logo.png";
class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.authCreds.auth.authenticated ? (
          <Redirect to={"/"} />
        ) : (
          <div className="container">
            <div className="internal-container">
              <img src={logo} className="logo"></img>
              <Button
                className="login-button"
                onClick={() =>
                  window.open("http://localhost:8888/auth/google", "_self")
                }
              >
                Sign in With Google
              </Button>
              
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AuthContext(LoginPage);
