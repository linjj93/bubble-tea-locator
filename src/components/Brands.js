import React from "react";

function Brands(props) {
  const brands = props.brands.map(brand => {
    return (
      <option key={brand} value={brand}>
        {brand}
      </option>
    );
  });
  return (
    <div className="search-brand">
      <p>Craving For:</p>
      <select id="brand-dropdown" onChange={props.onChange} multiple>
        <option>Any</option>
        {brands}
      </select>
    </div>
  );
}

export default Brands;
