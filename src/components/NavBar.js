import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavBar() {
  return (
    <Router>
      <nav>
        navigation
        <ul>
          <Link to="/bubble-tea">Bubble Tea</Link>
        </ul>
      </nav>
    </Router>
  );
}

export default NavBar;
