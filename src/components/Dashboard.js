import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";

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
    let headers = {};
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      headers.Authorization = "Bearer " + jwt;
    }
    const { loggedInUser } = this.props.location.state;

    this.setState({
      message: `Welcome, ${loggedInUser}!`,
      loggedInUser: loggedInUser
    });

    axios({
      method: "get",
      url: `${host}/users/${loggedInUser}/dashboard`,
      headers
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
          <Link className="category" to="/find-a-shop">
            Find a Shop
          </Link>
          <Link
            className="category"
            to={{
              pathname: "/drinking-history",
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
