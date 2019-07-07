import React from "react";

function StoreSelect(props) {
  const stores = props.stores.map(store => {
    return (
      <div className="store-checkbox">
        <label key={store + "-label"} htmlFor={store + "-checkbox"}>
          <input
            onChange={props.selectSingleStore}
            id={store + "-checkbox"}
            key={store}
            type="checkbox"
            name="store-select"
            value={store}
            checked={props.checkboxState[store]}
            data-testid={store + " testId"}
          />
          {store}
        </label>
      </div>
    );
  });
  return (
    <div className="search-store">
      <label id="which-store" htmlFor="store-dropdown">
        Which Store(s)?
      </label>
      <form id="store-dropdown" key="store-form">
        <div className="store-checkbox">
          <label>
            <input
              id="any-store"
              key="any-store"
              type="checkbox"
              name="store-select"
              value="all"
              onChange={props.selectAllStores}
              // checked={!props.atLeastOneStoreNotPicked}
              checked={props.allStoresAreChosen}
            />
            Any Store
          </label>
        </div>
        {stores}
      </form>
    </div>
  );
}

export default StoreSelect;
