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
      <p>Where Are You?</p>
      <select
        value={props.selectedLocation}
        onChange={props.onChange}
        id="location-dropdown"
      >
        <option key="default">Choose Location</option>
        {userLocation}
      </select>
    </div>
  );
}

export default LocationSelect;
