import React from "react";
import "../styles/Listing.css";

function Listing(props) {
  const thereIsNoSelection = !props.nearestShops.length;
  if (thereIsNoSelection) {
    return (
      <React.Fragment>
        <ul className="outlet-wrapper">
          <li>
            <span>Shop</span>
            <span>Location</span>
            <span>Distance (in metres)</span>
          </li>
          <p>Select your craving, location or both!</p>
        </ul>
        )
      </React.Fragment>
    );
  }

  const listOfShops = props.nearestShops.map(shop => {
    return (
      <li key={shop.id}>
        <span>
          <img src={shop.logo} alt={shop.id} />
        </span>
        <span>{shop.name}</span>
        <span>
          {isNaN(shop.distanceFromOrigin)
            ? "Select Location First"
            : shop.distanceFromOrigin}
        </span>
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className="outlet-wrapper">
        <li>
          <span>Shop</span>
          <span>Location</span>
          <span>Distance (in metres)</span>
        </li>
        {listOfShops}
      </ul>
    </React.Fragment>
  );
}

export default Listing;
