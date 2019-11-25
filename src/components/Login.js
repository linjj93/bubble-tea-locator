import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = ({ history }) => {
  const username = useFormInput("");
  const password = useFormInput("");

  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem("JWT");

    if (jwt && !username) {
      axios({
        method: "get",
        url: process.env.REACT_APP_REST_API_LOCATION + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          setLoginSuccess(true);
          history.push("/dashboard");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  });

  const handleLogin = async event => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_REST_API_LOCATION}/users/login`, {
        username: username.value,
        password: password.value
      })
      .then(res => {
        sessionStorage.setItem("JWT", res.data.token);
        setMessage(res.data.message);
        setLoginSuccess(true);
        history.push("/dashboard");
      })
      .catch(err => setMessage(err.response.data.message));
  };

  const redirectTo = path => {
    history.push(path);
  };

  return (
    <React.Fragment>
      {!loginSuccess && (
        <form className="login-form" autoComplete="off">
          <p className="warning">{message}</p>
          <div>
            <label htmlFor="username">Username</label>
            <input
              className="detail-box"
              {...username}
              type="text"
              id="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="detail-box"
              {...password}
              type="password"
              id="password"
            />
          </div>
          <input
            onClick={handleLogin}
            className="login-btn"
            type="submit"
            value="Login"
          />
          <input
            className="register-btn"
            type="button"
            value="Sign Up"
            onClick={() => {
              redirectTo("/register");
            }}
          />
        </form>
      )}
    </React.Fragment>
  );
};

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};

export default Login;
