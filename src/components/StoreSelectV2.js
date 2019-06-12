import React from "react";

function StoreSelect(props) {
  const stores = props.stores.map(store => {
    return (
      <input type="checkbox" name="store" key={store} value={store} checked />
    );
  });
  return (
    <div className="search-brand">
      <label htmlFor="brand-dropdown">Which Store?</label>
      <form id="brand-dropdown" onChange={props.onChange} multiple>
        {stores}
      </form>
    </div>
  );
}

export default StoreSelect;
