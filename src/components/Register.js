import React from "react";
import axios from "axios";
import "../styles/Register.css";

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

  handleChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

  handleSignUp(event) {
    event.preventDefault();
    const { username, password, passwordCfm } = this.state;
    axios
      .post(`${process.env.REACT_APP_REST_API_LOCATION}/users/register`, {
        username,
        password,
        passwordCfm
      })
      .then(res => {
        sessionStorage.setItem("JWT", res.data.token);
        this.setState({
          registrationSuccess: true
        });
        this.props.history.push("/dashboard");
      })
      .catch((err, res) => {
        this.setState({
          message: err.response.data.message
        });
      });
  }

  render() {
    const { registrationSuccess, message } = this.state;

    return (
      <React.Fragment>
        {!registrationSuccess && (
          <form className="signup-form" autoComplete="off">
            <p className="warning">{message}</p>
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="detail-box"
                onChange={this.handleChange}
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="detail-box"
                onChange={this.handleChange}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <label htmlFor="passwordCfm">Confirm Password</label>
              <input
                className="detail-box"
                onChange={this.handleChange}
                type="password"
                name="passwordCfm"
                id="passwordCfm"
              />
            </div>

            <input
              onClick={this.handleSignUp.bind(this)}
              className="signup-btn"
              type="submit"
              value="Sign Up"
            />
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default Register;
