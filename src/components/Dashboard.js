import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";

const host = process.env.REACT_APP_URL || "http://localhost:3002";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loggedInUser: "",
      isLoading: true
    };
  }

  componentDidMount = async () => {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !this.state.loggedInUser) {
      await axios({
        method: "get",
        url: host + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          this.setState({
            message: `Welcome, ${res.data.username}!`,
            loggedInUser: res.data.username,
            isLoading: false
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      this.setState({
        loggedInUser: ""
      });
      this.props.history.push("/");
    }
  };

  componentDidUpdate = async () => {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !this.state.loggedInUser) {
      await axios({
        method: "get",
        url: host + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          this.setState({
            message: `Welcome, ${res.data.username}!`,
            loggedInUser: res.data.username,
            isLoading: false
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  handleChange = event => {
    console.log("chng");

    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

  handleLogin = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    await axios
      .post(`${host}/users/login`, {
        username,
        password
      })
      .then(res => {
        sessionStorage.setItem("JWT", res.data.token);
        this.setState({
          isLoading: false,
          loggedInUser: res.data.username,
          message: `Welcome, ${res.data.username}!`
        });
      })
      .catch(err =>
        this.setState({
          message: err.response.data.message
        })
      );
  };

  render() {
    const { isLoading, message, loggedInUser } = this.state;

    return (
      <React.Fragment>
        {isLoading && <p>Loading</p>}

        {!isLoading && (
          <div data-testid="home-page">
            <p className="prompt">{message}</p>
            <div className="category-wrapper">
              <Link
                className="category"
                to={{ pathname: "/find-a-shop", state: { loggedInUser } }}
              >
                Find a Shop
              </Link>
              <Link
                className="category"
                to={{
                  pathname: "/drink-tracker"
                }}
              >
                Drink Tracker
              </Link>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
