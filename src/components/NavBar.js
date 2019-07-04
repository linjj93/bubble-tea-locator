import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import axios from "axios";
const host = "http://localhost:3001";

class NavBar extends React.Component {
  handleLogout() {
    sessionStorage.removeItem("jwt");
    axios
      .post(`${host}/users/logout`)
      .then(res => {
        console.log("logout");
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <nav>
        <div className="mobile-nav">
          <span>Menu</span>
          <div className="links">
            <Link
              className="nav-item"
              to={{
                pathname: "/dashboard",
                state: {
                  loggedInUser
                }
              }}
            >
              Dashboard
            </Link>

            <Link className="nav-item" to="/find-a-shop">
              Find a Shop
            </Link>

            <Link
              onClick={this.handleLogout.bind(this)}
              className="nav-item"
              to="/"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
