import React from "react";
import "../styles/Listing.css";

function Listing(props) {
  function populateListing(props) {
    const thereIsNoSelection = !props.nearestShops.length;
    if (thereIsNoSelection) {
      return <p>Select the store you like and your location!</p>;
    }
    const listOfShops = props.nearestShops.map(shop => {
      return (
        <li key={shop.id}>
          <span>
            <img src={shop.logo} alt={shop.brand} />
          </span>
          <span className="address">
            <span>{shop.name}</span>
            <span>{shop.unit}</span>
          </span>
          <span>{shop.openingHours}</span>
          <span data-testid="waiting-time">{shop.queueTime} mins</span>
          <span className={shop.distanceMarker} data-testid="distance">
            {isNaN(shop.distanceFromOrigin)
              ? "Select Location First"
              : shop.distanceFromOrigin}
          </span>
        </li>
      );
    });
    return listOfShops;
  }

  return (
    <React.Fragment>
      <ul className="outlet-wrapper" data-testid="listing">
        <li className="listing-header">
          <span>Shop</span>
          <span>Location</span>
          <span>Opening Hours</span>
          <span>Waiting Time</span>
          <span>Distance (in km)</span>
        </li>
        <div className="shops">{populateListing(props)}</div>
      </ul>
    </React.Fragment>
  );
}

export default Listing;
