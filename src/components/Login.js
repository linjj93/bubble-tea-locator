import React from "react";
import "../styles/Login.css";
import axios from "axios";

const host = "http://localhost:3001";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
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
    axios
      .post(`${host}/users/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        if (res.data.message) {
          this.setState({
            message: res.data.message
          });
        } else {
          this.setState({
            loggedInUser: res.data.username,
            message: res.data.username
          });
        }
        if (res.data.token) {
          sessionStorage.setItem("jwt", res.data.token);
        }
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <label>
            Username:
            <input
              onChange={this.handleUsername.bind(this)}
              type="text"
              name="name"
            />
          </label>
          <label>
            Password:{" "}
            <input
              onChange={this.handlePassword.bind(this)}
              type="text"
              name="password"
            />
          </label>
          <input
            onClick={this.handleLogin.bind(this)}
            className="submit-btn"
            type="submit"
            value="Login"
          />
        </form>
        <p>{this.state.message}</p>
      </React.Fragment>
    );
  }
}

export default Login;
