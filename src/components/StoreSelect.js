import React from "react";

function StoreSelect(props) {
  const brands = props.brands.map(brand => {
    return (
      <option key={brand} value={brand}>
        {brand}
      </option>
    );
  });
  return (
    <div className="search-brand">
      <p>Which Store?</p>
      <select id="brand-dropdown" onChange={props.onChange} multiple>
        {brands}
      </select>
    </div>
  );
}

export default StoreSelect;
