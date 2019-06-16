import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home(props) {
  return (
    <div data-testid="home-page">
      <p className="prompt">Pick a category</p>
      <div className="category-wrapper">
        <Link className="category" to="/bubble-tea">
          Bubble Tea
        </Link>
        <Link className="category" to="/bargain-shop">
          ValuDollar/ABC Shops
        </Link>
        <Link className="category" to="/arcade">
          Arcades
        </Link>
      </div>
    </div>
  );
}

export default Home;
