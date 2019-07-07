import React from "react";
import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import "../../styles/Search.css";

function Search(props) {
  return (
    <div className="search-wrapper">
      <StoreSelect
        stores={props.stores}
        allStoresAreChosen={props.allStoresAreChosen}
        selectAllStores={props.selectAllStores}
        selectSingleStore={props.selectSingleStore}
        checkboxState={props.checkboxState}
      />
      <LocationSelect
        userLocation={props.userLocation}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Search;
