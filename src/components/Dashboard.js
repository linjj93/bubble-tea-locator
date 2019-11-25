/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";

const Dashboard = ({ history }) => {
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !loggedInUser) {
      axios({
        method: "get",
        url: process.env.REACT_APP_REST_API_LOCATION + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          setIsLoading(false);
          setMessage(`Welcome, ${res.data.username}!`);
          setLoggedInUser(res.data.username);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      setLoggedInUser("");

      history.push("/");
    }
  }, []);

  return (
    <React.Fragment>
      {isLoading && <p>Loading</p>}

      {!isLoading && (
        <div data-testid="home-page">
          <p className="prompt">{message}</p>
          <div className="category-wrapper">
            <Link className="category" to={{ pathname: "/find-a-shop" }}>
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
};

export default Dashboard;
