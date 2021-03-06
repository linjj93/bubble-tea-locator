import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import axios from "axios";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout() {
    sessionStorage.removeItem("JWT");
    axios
      .post(`${process.env.REACT_APP_REST_API_LOCATION}/users/logout`)
      .then(res => {
        console.log("logout");
      })
      .catch(err => console.log(err));
  }

  render() {
    const { navBarPath, navBarDisplay } = this.props;
    return (
      <nav>
        <div className="mobile-nav">
          <span>Menu</span>
          <div className="links">
            <Link
              className="nav-item"
              to={{
                pathname: "/dashboard"
              }}
            >
              Dashboard
            </Link>

            <Link className="nav-item" to={{ pathname: navBarPath }}>
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
