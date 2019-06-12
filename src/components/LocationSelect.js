import React from "react";

function LocationSelect(props) {
  const userLocation = props.userLocation.map(loc => {
    return (
      <option key={loc.id} value={loc.name}>
        {loc.name}
      </option>
    );
  });
  return (
    <div className="search-location">
      <label htmlFor="location-dropdown">Where Are You?</label>
      <select
        defaultValue="Choose Location"
        // value={props.selectedLocation}
        onChange={props.onChange}
        id="location-dropdown"
      >
        <option defaultValue="default-option" disabled key="default">
          Choose Location
        </option>
        {userLocation}
      </select>
    </div>
  );
}

export default LocationSelect;
