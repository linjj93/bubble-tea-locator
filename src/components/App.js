import React from "react";
import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
// import FilterMaxPerStore from "./FilterMaxPerStore";
import "../styles/App.css";
import { stores, userLocation, shops } from "../assets/data";
import { calcAllShopDistances } from "../assets/helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: [],
      selectedLocation: "None",
      nearestShops: [],
      showTopN: shops.length,
      // showSubsetOfMaxPerStore: false,
      // subsetOfMaxPerStore: [],
      limits: ["all", 1, 2, 3, 4, 5]
    };
  }

  sortShopsByDistance(shopListing) {
    return shopListing.sort((a, b) =>
      a.distanceFromOrigin > b.distanceFromOrigin ? 1 : -1
    );
  }

  filterShopsByStore(shopListing, chosenStores) {
    return shopListing.filter(shop => chosenStores.includes(shop.brand));
  }

  limitNumberOfShops(shopListing, n) {
    return shopListing.filter((shop, index) => index + 1 <= n);
  }

  selectLocation(event) {
    const newLocation = event.target.value;
    this.setState({ selectedLocation: newLocation });
    this.findNearestShops(
      newLocation,
      this.state.selectedStores,
      this.state.showTopN
    );
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
    this.findNearestShops(
      this.state.selectedLocation,
      chosen,
      this.state.showTopN
    );
  }

  selectLimit(event) {
    const newLimit = event.target.value;
    this.setState({
      showTopN: newLimit === "all" ? shops.length : newLimit
    });
    this.findNearestShops(
      this.state.selectedLocation,
      this.state.selectedStores,
      newLimit
    );
  }

  findNearestShops(chosenLocation, chosenStores, showTopN) {
    let listing = shops;
    for (let locObj of userLocation) {
      if (chosenLocation === locObj.name) {
        calcAllShopDistances(listing, locObj);
        break;
      }
    }
    listing = this.filterShopsByStore(listing, chosenStores);
    listing = this.sortShopsByDistance(listing);
    listing = this.limitNumberOfShops(listing, showTopN);

    this.setState({
      nearestShops: listing
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
            onChange={this.selectLimit.bind(this)}
          />
          {/* <FilterMaxPerStore onChange={this.limitMaxPerStore.bind(this)} /> */}
        </div>
        <Listing
          nearestShops={this.state.nearestShops}
          // showSubsetOfMaxPerStore={this.state.showSubsetOfMaxPerStore}
          // subsetOfMaxPerStore={this.state.subsetOfMaxPerStore}
        />
      </React.Fragment>
    );
  }
}

export default App;
