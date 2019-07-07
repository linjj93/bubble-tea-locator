import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";
import { setAuthorizationHeader } from "../utils/helper";

const host = "http://localhost:3001";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loggedInUser: ""
    };
  }

  componentDidMount() {
    const { loggedInUser } = this.props.location.state;

    this.setState({
      message: `Welcome, ${loggedInUser}!`,
      loggedInUser: loggedInUser
    });

    axios({
      method: "get",
      url: `${host}/users/${loggedInUser}/dashboard`,
      headers: setAuthorizationHeader()
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.message));
  }

  render() {
    const { message, loggedInUser } = this.state;

    return (
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
              pathname: "/drink-tracker",
              state: {
                loggedInUser
              }
            }}
          >
            Drink Tracker
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
