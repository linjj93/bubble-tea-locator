import React from "react";

function LocationSelect(props) {
  const userLocation = props.userLocation.map(loc => {
    return <option key={loc.id}>{loc.name}</option>;
  });
  return (
    <div className="search-location">
      <p>Where Are You?</p>
      <select onChange={props.onChange} id="location-dropdown">
        {userLocation}
      </select>
    </div>
  );
}

export default LocationSelect;
