import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar(props) {
  const { loggedInUser } = props;
  return (
    <nav>
      <ul>
        <Link
          to={{
            pathname: "/dashboard",
            state: {
              loggedInUser
            }
          }}
        >
          Dashboard
        </Link>
        <Link to="/find-a-shop">Find a Shop</Link>
        <Link to="/">Logout</Link>
      </ul>
    </nav>
  );
}

export default NavBar;
