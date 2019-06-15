import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home(props) {
  return (
    <div data-testid="home-page">
      <p className="prompt">Looking for...</p>
      <div className="category-wrapper">
        <div className="category">
          <Link className="label" to="/bubble-tea">
            Bubble Tea
          </Link>
        </div>
        <div className="category">
          <Link className="label" to="/bargain-shop">
            ValuDollar/ABC Shops
          </Link>
        </div>
        <div className="category">
          <Link className="label" to="/mala">
            Mala Hotpot/Grilled Fish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
