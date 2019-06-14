import React from "react";

function Home(props) {
  return (
    <React.Fragment>
      <label htmlFor="category-select">Looking for...</label>
      <select defaultValue="Select a category" id="category-select">
        <option>Select a category</option>
        <option>Bubble Tea</option>
      </select>
    </React.Fragment>
  );
}

export default Home;
