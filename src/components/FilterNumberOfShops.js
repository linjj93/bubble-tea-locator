import React from "react";

function FilterNumberOfShops(props) {
  return (
    <div className="select-number">
      <select
        onChange={props.onChange}
        name="number-of-shops"
        id="shop-limit-dropdown"
      >
        <option value="all">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      nearest shop(s)
    </div>
  );
}

export default FilterNumberOfShops;
