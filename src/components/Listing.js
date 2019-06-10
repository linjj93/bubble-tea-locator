import React from "react";

function Listing(props) {
  const thereIsNoSelection = props.nearestShops === undefined;
  if (thereIsNoSelection) {
    return <h1>Select dropdown</h1>;
  }

  const listOfShops = props.nearestShops.map(shop => {
    return (
      <li key={shop.id}>
        <span>{shop.logo}</span>
        <span>{shop.name}</span>
        <span>{shop.distanceFromOrigin}</span>
      </li>
    );
  });

  return (
    <ul className="outlet-wrapper">
      <li>
        <span>Shop Logo</span>
        <span>Shop Name</span>
        <span>Distance (in metres)</span>
      </li>
      {listOfShops}
    </ul>
  );
}

export default Listing;
