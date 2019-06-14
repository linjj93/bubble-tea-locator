import React from "react";

function StoreSelect(props) {
  const stores = props.stores.map(store => {
    return (
      <option key={store} value={store}>
        {store}
      </option>
    );
  });
  return (
    <div className="search-brand">
      <label htmlFor="brand-dropdown">Which Store(s)?</label>
      <select id="brand-dropdown" onChange={props.onChange} multiple>
        <option key="all" value="all">
          Any Store
        </option>
        {stores}
      </select>
    </div>
  );
}

export default StoreSelect;

//   let chosen = [];
//   for (let choice of choices) {
//     if (choice.selected && choice.value === "all") {
//       chosen = stores;
//       break;
//     } else if (choice.selected) {
//       chosen.push(choice.value);
//     }
//   }