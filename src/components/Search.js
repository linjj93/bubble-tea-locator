import React from "react";
import Brands from "./Brands";
import LocationSelect from "./LocationSelect";

function Search(props) {
  return (
    <React.Fragment>
      <Brands brands={props.brands} onChange={props.onChange} />
      <LocationSelect
        onChange={props.onChange}
        userLocation={props.userLocation}
      />
    </React.Fragment>
  );
}

export default Search;
