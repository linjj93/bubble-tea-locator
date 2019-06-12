import React from "react";
import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
// import FilterMaxPerStore from "./FilterMaxPerStore";
import "../styles/App.css";
import { stores, userLocation, shops } from "../assets/data";
import { calcDistance } from "../assets/helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: [],
      selectedLocation: "None",
      nearestShops: [],
      showSubsetOfTopN: false,
      subsetOfTopN: 0,
      showSubsetOfMaxPerStore: false,
      subsetOfMaxPerStore: [],
      limits: ["all", 1, 2, 3, 4, 5]
    };
  }

  calcAllShopDistances(shopListing, origin) {
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

  sortShopsByDistance(shopListing) {
    return shopListing.sort((a, b) =>
      a.distanceFromOrigin > b.distanceFromOrigin ? 1 : -1
    );
  }

  filterShopsByStore(shopListing, chosenStores) {
    return shopListing.filter(shop => chosenStores.includes(shop.brand));
  }

  findNearestShops(chosenLocation, chosenStores) {
    let listing = shops;
    for (let locObj of userLocation) {
      if (chosenLocation === locObj.name) {
        this.calcAllShopDistances(listing, locObj);
        break;
      }
    }
    listing = this.filterShopsByStore(listing, chosenStores);
    listing = this.sortShopsByDistance(listing);

    this.setState({
      nearestShops: listing
    });
  }

  selectLocation(event) {
    const newLocation = event.target.value;
    this.setState({ selectedLocation: newLocation });
    this.findNearestShops(newLocation, this.state.selectedStores);
  }

  selectStores(event) {
    let choices = event.target.options;
    const chosen = [];
    for (let choice of choices) {
      if (choice.selected) {
        chosen.push(choice.value);
      }
    }
    this.setState({
      selectedStores: chosen
    });
    this.findNearestShops(this.state.selectedLocation, chosen);
  }

  limitNumberOfShops(event) {
    this.setState({
      showSubsetOfTopN: true,
      subsetOfTopN:
        event.target.value === "all" ? shops.length : event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <StoreSelect
            stores={stores}
            onChange={this.selectStores.bind(this)}
          />
          <LocationSelect
            onChange={this.selectLocation.bind(this)}
            userLocation={userLocation}
            selectedLocation={this.state.selectedLocation}
          />
        </div>
        <div className="advanced-filters">
          <p>Show:</p>
          <FilterNumberOfShops
            limits={this.state.limits}
            onChange={this.limitNumberOfShops.bind(this)}
          />
          {/* <FilterMaxPerStore onChange={this.limitMaxPerStore.bind(this)} /> */}
        </div>
        <Listing
          showSubsetOfTopN={this.state.showSubsetOfTopN}
          subsetOfTopN={this.state.subsetOfTopN}
          nearestShops={this.state.nearestShops}
          // showSubsetOfMaxPerStore={this.state.showSubsetOfMaxPerStore}
          // subsetOfMaxPerStore={this.state.subsetOfMaxPerStore}
        />
      </React.Fragment>
    );
  }
}

export default App;
