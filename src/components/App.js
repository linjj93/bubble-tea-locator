import React from "react";

import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
import FilterWaitingTime from "./FilterWaitingTime";

import "../styles/App.css";

import { shops } from "../assets/shops";
import { stores } from "../assets/brands";
import { userLocation } from "../assets/locationChoices";

import {
  calcAllShopDistances,
  sortShopsByDistanceAndTime,
  filterShopsByStore,
  filterShopsByWaitingTime,
  limitNumberOfShops
} from "../assets/helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: [],
      selectedLocation: "None",
      nearestShops: [],
      showTopN: shops.length,
      limits: ["all", 1, 2, 3, 4, 5],
      showWaitingTime: 50,
      minutes: [10, 20, 30, 40, 50],
      waitingTimeOrder: "↗",
      distanceOrder: "↗"
    };
  }

  sortByWaitingTime() {
    const listing = this.state.nearestShops;
    const order = this.state.waitingTimeOrder;
    order === "↘"
      ? listing.sort((a, b) => (a.queueTime > b.queueTime ? 1 : -1))
      : listing.sort((a, b) => (a.queueTime < b.queueTime ? 1 : -1));
    order === "↘"
      ? this.setState({ waitingTimeOrder: "↗" })
      : this.setState({ waitingTimeOrder: "↘" });
  }

  sortByDistance() {
    const listing = this.state.nearestShops;
    const order = this.state.distanceOrder;
    order === "↘"
      ? listing.sort((a, b) =>
          a.distanceFromOrigin > b.distanceFromOrigin ? 1 : -1
        )
      : listing.sort((a, b) =>
          a.distanceFromOrigin < b.distanceFromOrigin ? 1 : -1
        );
    order === "↘"
      ? this.setState({ distanceOrder: "↗" })
      : this.setState({ distanceOrder: "↘" });
  }

  selectLocation(event) {
    const newLocation = event.target.value;
    this.setState({ selectedLocation: newLocation });
    this.findNearestShops(
      newLocation,
      this.state.selectedStores,
      this.state.showTopN,
      this.state.showWaitingTime
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
      this.state.showTopN,
      this.state.showWaitingTime
    );
  }

  selectLimit(event) {
    let newLimit = event.target.value;
    if (newLimit === "all") {
      newLimit = shops.length;
    }
    this.setState({
      showTopN: newLimit,
      distanceOrder: "↗",
      waitingTimeOrder: "→"
    });

    this.findNearestShops(
      this.state.selectedLocation,
      this.state.selectedStores,
      newLimit,
      this.state.showWaitingTime
    );
  }

  selectTime(event) {
    const newTimeLimit = event.target.value;
    this.setState({
      showWaitingTime: newTimeLimit
    });
    this.findNearestShops(
      this.state.selectedLocation,
      this.state.selectedStores,
      this.state.showTopN,
      newTimeLimit
    );
  }

  findNearestShops(chosenLocation, chosenStores, showTopN, showWaitingTime) {
    let listing = shops;
    for (let locObj of userLocation) {
      if (chosenLocation === locObj.name) {
        calcAllShopDistances(listing, locObj);
        break;
      }
    }

    listing = filterShopsByStore(listing, chosenStores);
    listing = filterShopsByWaitingTime(listing, showWaitingTime);
    listing = sortShopsByDistanceAndTime(listing);
    listing = limitNumberOfShops(listing, showTopN);

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
            userLocation={userLocation}
            onChange={this.selectLocation.bind(this)}
          />
        </div>
        <div className="advanced-filters">
          <FilterNumberOfShops
            limits={this.state.limits}
            onChange={this.selectLimit.bind(this)}
          />

          <FilterWaitingTime
            minutes={this.state.minutes}
            onChange={this.selectTime.bind(this)}
          />
        </div>
        <Listing
          nearestShops={this.state.nearestShops}
          waitingTimeOrder={this.state.waitingTimeOrder}
          sortByWaitingTime={this.sortByWaitingTime.bind(this)}
          distanceOrder={this.state.distanceOrder}
          sortByDistance={this.sortByDistance.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default App;
