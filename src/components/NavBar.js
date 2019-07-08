import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import axios from "axios";
const host = "https://jj-bubble-tea-app.herokuapp.com" || "http://localhost:3001";



class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
    const { loggedInUser, navBarPath, navBarDisplay } = this.props;
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

            <Link
              className="nav-item"
              to={{ pathname: navBarPath, state: { loggedInUser } }}
            >
              {navBarDisplay}
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
