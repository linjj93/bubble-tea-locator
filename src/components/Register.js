import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const host = "http://localhost:3001";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationSuccess: false,
      username: "",
      password: "",
      passwordCfm: "",
      message: "",
      loggedInUser: ""
    };
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPassword(event) {
    this.setState({
      passwordCfm: event.target.value
    });
  }

  handleSignUp(event) {
    event.preventDefault();
    const { username, password, passwordCfm } = this.state;
    axios
      .post(`${host}/users/register`, {
        username,
        password,
        passwordCfm
      })
      .then(res => {
        this.setState({
          loggedInUser: username,
          registrationSuccess: true
        });
        if (res.data.token) {
          sessionStorage.setItem("jwt", res.data.token);
        }
      })
      .catch((err, res) => {
        this.setState({
          message: err.response.data.message
        });
      });
  }

  render() {
    const { registrationSuccess, loggedInUser, message } = this.state;

    if (registrationSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { loggedInUser }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <form className="signup-form" autoComplete="off">
          <p className="warning">{message}</p>
          <div>
            <label>Username</label>
            <input
              className="detail-box"
              onChange={this.handleUsername.bind(this)}
              type="text"
              name="name"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="detail-box"
              onChange={this.handlePassword.bind(this)}
              type="password"
              name="password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              className="detail-box"
              onChange={this.handleConfirmPassword.bind(this)}
              type="password"
              name="password"
            />
          </div>

          <input
            onClick={this.handleSignUp.bind(this)}
            className="signup-btn"
            type="submit"
            value="Sign Up"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
