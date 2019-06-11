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
            <span>Distance (in km)</span>
          </li>
          <p>Select the store you like and your location!</p>
        </ul>
      </React.Fragment>
    );
  }

  const filterNearestShops = props.showSubset;
  if (filterNearestShops) {
    const listOfShopsFiltered = props.nearestShops
      .filter((shop, index) => index + 1 <= props.subsetOfTopN)
      .map(shop => {
        return (
          <li key={shop.id}>
            <span>
              <img src={shop.logo} alt={shop.brand} />
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
            <span>Distance (in km)</span>
          </li>
          {listOfShopsFiltered}
        </ul>
      </React.Fragment>
    );
  }

  const listOfShops = props.nearestShops.map(shop => {
    return (
      <li key={shop.id}>
        <span>
          <img src={shop.logo} alt={shop.brand} />
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
          <span>Distance (in km)</span>
        </li>
        {listOfShops}
      </ul>
    </React.Fragment>
  );
}

export default Listing;
