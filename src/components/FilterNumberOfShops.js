import React from "react";

function FilterNumberOfShops(props) {
  const options = props.limits.map(num => {
    return (
      <option key={num} value={num}>
        {num}
      </option>
    );
  });
  return (
    <div className="select-number">
      Show
      <select
        defaultValue="all"
        onChange={props.onChange}
        name="number-of-shops"
        id="shop-limit-dropdown"
      >
        {options}
      </select>
      nearest shop(s) with
    </div>
  );
}

export default FilterNumberOfShops;
