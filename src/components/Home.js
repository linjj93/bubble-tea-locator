import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div data-testid="home-page">
      <label htmlFor="category-select">Looking for...</label>
      {/* <select defaultValue="Select a category" id="category-select">
        <option>Select a category</option>
        <option>BBT</option>
      </select> */}
      <div>
        <Link to="/bubble-tea">Bubble Tea</Link>
      </div>
    </div>
  );
}

export default Home;
