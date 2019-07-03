import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home(props) {
  return (
    <div data-testid="home-page">
      <p className="prompt">Welcome back!</p>
      <div className="category-wrapper">
        <Link className="category" to="/find-a-shop">
          Find a Shop
        </Link>
        <Link className="category" to="/drinking-history">
          Drinking History
        </Link>
      </div>
    </div>
  );
}

export default Home;
