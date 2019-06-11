import React from "react";

function FilterMaxPerStore(props) {
  return (
    <div className="select-number-per-store">
      <p>
        max
        <select name="number-of-shops" id="store-limit-dropdown">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        per store
      </p>
    </div>
  );
}

export default FilterMaxPerStore;
