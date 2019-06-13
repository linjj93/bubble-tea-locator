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
          <span data-testid="waiting-time">{shop.queueTime} minutes</span>
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
        <li>
          <span>Shop</span>
          <span>Location</span>
          <span>
            Waiting Time{" "}
            <span className="waiting-time" onClick={props.sortByWaitingTime}>
              {props.waitingTimeOrder}
            </span>
          </span>
          <span>
            Distance (in km){" "}
            <span className="distance" onClick={props.sortByDistance}>
              {props.distanceOrder}
            </span>
          </span>
        </li>
        {populateListing(props)}
      </ul>
    </React.Fragment>
  );
}

export default Listing;
