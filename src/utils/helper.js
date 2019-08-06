function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calcAllShopDistances(shopListing, origin) {
  for (let shop of shopListing) {
    shop.distanceFromOrigin = calcDistance(
      origin.latitude,
      origin.longitude,
      shop.latitude,
      shop.longitude
    );

    shop.distanceFromOrigin = shop.distanceFromOrigin.toFixed(2);

    if (shop.distanceFromOrigin >= 1) {
      shop.distanceMarker = "far";
    } else if (
      shop.distanceFromOrigin > 0.25 &&
      shop.distanceFromOrigin <= 0.5
    ) {
      shop.distanceMarker = "near";
    } else if (shop.distanceFromOrigin <= 0.25) {
      shop.distanceMarker = "very-near";
    } else {
      shop.distanceMarker = "";
    }
  }
}

function sortShopsByDistanceAndTime(shopListing) {
  return shopListing.sort((a, b) => {
    if (a.distanceFromOrigin > b.distanceFromOrigin) {
      return 1;
    } else if (a.distanceFromOrigin < b.distanceFromOrigin) {
      return -1;
    } else {
      return a.queueTime > b.queueTime ? 1 : -1;
    }
  });
}

function filterShopsByStore(shopListing, chosenStores) {
  return shopListing.filter(shop => chosenStores.includes(shop.brand));
}

function filterShopsByWaitingTime(shopListing, duration) {
  return shopListing.filter(shop => shop.queueTime <= duration);
}

function limitNumberOfShops(shopListing, n) {
  return shopListing.filter((shop, index) => index + 1 <= n);
}

function calculateOpeningHours(shop) {
  shop.openingHours = `${shop.openingTime.slice(
    0,
    5
  )} - ${shop.closingTime.slice(0, 5)}`;
}

function calculateStatus(shop) {
  const currentTime = new Date().toLocaleTimeString("it-IT");
  const isOpen =
    currentTime >= shop.openingTime && currentTime <= shop.closingTime;
  if (isOpen) {
    shop.status = `Open, closing at ${shop.closingTime.slice(0, 5)}`;
  } else {
    shop.status = `Opening at ${shop.openingTime.slice(0, 5)}`;
  }
}

function setAuthorizationHeader() {
  let headers = {};
  const jwt = sessionStorage.getItem("JWT");
  if (jwt) {
    headers.Authorization = "Bearer " + jwt;
  }
  return headers;
}

export {
  calcAllShopDistances,
  sortShopsByDistanceAndTime,
  filterShopsByStore,
  filterShopsByWaitingTime,
  limitNumberOfShops,
  calculateOpeningHours,
  calculateStatus,
  setAuthorizationHeader
};
