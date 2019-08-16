import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      loginSuccess: false
    };
  }

  componentDidMount = async () => {
    const jwt = sessionStorage.getItem("JWT");

    if (jwt && !this.state.username) {
      await axios({
        method: "get",
        url: process.env.REST_API_LOCATION + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          this.updateUser(res.data.username);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  componentDidUpdate = async () => {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !this.state.username) {
      await axios({
        method: "get",
        url: process.env.REST_API_LOCATION + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          this.updateUser(res.data.username);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  updateUser = username => {
    this.setState({
      username,
      loginSuccess: true
    });
  };

  handleChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

  handleLogin = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    await axios
      .post(`${process.env.REST_API_LOCATION}/users/login`, {
        username,
        password
      })
      .then(res => {
        sessionStorage.setItem("JWT", res.data.token);
        this.setState({
          message: res.data.message
        });
        this.updateUser(res.data.username);
        this.props.history.push("/dashboard");
      })
      .catch(err =>
        this.setState({
          message: err.response.data.message
        })
      );
  };

  render() {
    const { message, loginSuccess } = this.state;

    return (
      <React.Fragment>
        {!loginSuccess && (
          <form className="login-form" autoComplete="off">
            <p className="warning">{message}</p>
            <div>
              <label>Username</label>
              <input
                className="detail-box"
                onChange={this.handleChange}
                type="text"
                name="username"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="detail-box"
                onChange={this.handleChange}
                type="password"
                name="password"
              />
            </div>
            <input
              onClick={this.handleLogin}
              className="login-btn"
              type="submit"
              value="Login"
            />
            <Link to="/register">
              <input className="register-btn" type="button" value="Sign Up" />
            </Link>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default Login;
