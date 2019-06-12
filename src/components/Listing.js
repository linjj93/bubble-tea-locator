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
          <span class="address">
            <span>{shop.name}</span>
            <span>{shop.unit}</span>
          </span>
          <span>{shop.queueTime} minutes</span>
          <span className={shop.distanceMarker}>
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
      <ul className="outlet-wrapper">
        <li>
          <span>Shop</span>
          <span>Location</span>
          <span>
            Average Waiting Time{" "}
            <span class="waiting-time" onClick={props.sortByWaitingTime}>
              {props.waitingTimeOrder}
            </span>
          </span>
          <span>
            Distance (in km){" "}
            <span class="distance" onClick={props.sortByDistance}>
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
