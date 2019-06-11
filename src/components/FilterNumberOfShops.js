import React from "react";

function FilterNumberOfShops(props) {
  return (
    <div className="select-number">
      <p>
        Show top
        <select
          onChange={props.onChange}
          name="number-of-shops"
          id="shop-limit-dropdown"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        nearest shops
      </p>
    </div>
  );
}

export default FilterNumberOfShops;
