import React from "react";

import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
import FilterWaitingTime from "./FilterWaitingTime";

import "../styles/App.css";

import { shops } from "../assets/shops";
import { stores, checkboxState } from "../assets/stores";
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
      distanceOrder: "↗",
      checkboxState,
      allStoresAreChosen: false,
      atLeastOneStoreUnChecked: true
    };
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

  selectAllStores() {
    const updatedCheckboxState = this.state.checkboxState;
    const allStores = [];
    const notAllChosen = this.state.atLeastOneStoreUnChecked;

    for (let store of stores) {
      allStores.push(store);
      !notAllChosen
        ? (updatedCheckboxState[store] = false) // reverse, unselect all stores
        : (updatedCheckboxState[store] = true); // choose all stores
    }

    !notAllChosen
      ? (updatedCheckboxState["Any Store"] = false)
      : (updatedCheckboxState["Any Store"] = true);

    !notAllChosen
      ? this.setState({
          allChecked: false,
          allStoresAreChosen: false,
          atLeastOneStoreUnChecked: true,
          checkboxState: updatedCheckboxState,
          selectedStores: []
        })
      : this.setState({
          allChecked: true,
          allStoresAreChosen: true,
          atLeastOneStoreUnChecked: false,
          checkboxState: updatedCheckboxState,
          selectedStores: allStores
        });

    this.findNearestShops(
      this.state.selectedLocation,
      !notAllChosen ? [] : allStores,
      this.state.showTopN,
      this.state.showWaitingTime
    );
  }

  selectSingleStore(event) {
    const chosen = this.state.selectedStores;
    const choice = event.target.value;
    const updatedCheckboxState = this.state.checkboxState;
    if (!this.state.atLeastOneStoreUnChecked) {
      updatedCheckboxState["Any Store"] = false;
      this.setState({
        atLeastOneStoreUnChecked: true,
        allChecked: false,
        checkboxState: updatedCheckboxState
      });
    }

    updatedCheckboxState[choice]
      ? (updatedCheckboxState[choice] = false)
      : (updatedCheckboxState[choice] = true);

    chosen.indexOf(choice) < 0
      ? chosen.push(choice)
      : chosen.splice(chosen.indexOf(choice), 1);

    this.setState({
      checkboxState: updatedCheckboxState,
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
            allChecked={this.state.allStoresAreChosen}
            selectAllStores={this.selectAllStores.bind(this)}
            selectSingleStore={this.selectSingleStore.bind(this)}
            checkboxState={this.state.checkboxState}
            atLeastOneStoreUnChecked={this.state.atLeastOneStoreUnChecked}
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
        <Listing nearestShops={this.state.nearestShops} />
      </React.Fragment>
    );
  }
}

export default App;
