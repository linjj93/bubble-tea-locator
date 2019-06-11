import React from "react";
import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
import FilterMaxPerStore from "./FilterMaxPerStore";
import "../styles/App.css";
import { brands, userLocation, shops } from "../assets/data";
import { calcDistance } from "../assets/helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: [],
      selectedLocation: "None",
      nearestShops: [],
      showSubset: false,
      subsetSize: 0
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

  showTopN(shopListing, n) {
    return shopListing.filter((shop, index) => index + 1 <= n);
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
      showSubset: true,
      subsetSize:
        event.target.value === "all"
          ? this.state.nearestShops.length
          : event.target.value
    });
  }

  limitMaxPerStore(event) {
    const maxi = event.target.value;
    this.setState({ selectedMaxPerStore: maxi });
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <StoreSelect
            brands={brands}
            onChange={this.selectStores.bind(this)}
          />
          <LocationSelect
            onChange={this.selectLocation.bind(this)}
            userLocation={userLocation}
            selectedLocation={this.state.selectedLocation}
          />
        </div>
        <div className="advanced-filters">
          <FilterNumberOfShops onChange={this.limitNumberOfShops.bind(this)} />
          <FilterMaxPerStore onChange={this.limitMaxPerStore.bind(this)} />
        </div>
        <Listing
          showSubset={this.state.showSubset}
          subsetSize={this.state.subsetSize}
          nearestShops={this.state.nearestShops}
        />
      </React.Fragment>
    );
  }
}

export default App;
