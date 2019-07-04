import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const host = "http://localhost:3001";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      isLoggedIn: false
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

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    axios
      .post(`${host}/users/login`, {
        username,
        password
      })
      .then(res => {
        this.setState({
          loggedInUser: res.data.username,
          isLoggedIn: true
        });
        if (res.data.token) {
          sessionStorage.setItem("jwt", res.data.token);
        }
      })
      .catch(err =>
        this.setState({
          message: err.response.data.message
        })
      );
  }

  render() {
    const { isLoggedIn, loggedInUser, message } = this.state;

    if (isLoggedIn) {
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
        <form className="login-form" autoComplete="off">
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

          <input
            onClick={this.handleLogin.bind(this)}
            className="login-btn"
            type="submit"
            value="Login"
          />
          <Link to="/register">
            <input className="register-btn" type="button" value="Sign Up" />
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
