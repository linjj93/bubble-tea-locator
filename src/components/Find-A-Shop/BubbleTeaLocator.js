import React from "react";

import Search from "./Search";
import Filters from "./Filters";
import Listing from "./Listing";

import "../../styles/BubbleTeaLocator.css";

import { shops } from "../../data/shops";
import { stores, checkboxState } from "../../data/stores";
import { userLocation } from "../../data/locationChoices";

import {
  calcAllShopDistances,
  sortShopsByDistanceAndTime,
  filterShopsByStore,
  filterShopsByWaitingTime,
  limitNumberOfShops,
  calculateOpeningHours
} from "../../utils/helper";
import NavBar from "../NavBar";

class BubbleTeaLocator extends React.Component {
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
      checkboxState,
      allStoresAreChosen: false,
      loggedInUser: "",
      navBarPath: "/drink-tracker",
      navBarDisplay: "Drink Tracker"
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);

    this.setState({
      loggedInUser: this.props.location.state.loggedInUser
    });
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
    const allStoresAreChosen = this.state.allStoresAreChosen;

    for (let store of stores) {
      allStores.push(store);
      !allStoresAreChosen
        ? (updatedCheckboxState[store] = true)
        : (updatedCheckboxState[store] = false);
    }

    updatedCheckboxState["Any Store"] = !updatedCheckboxState["Any Store"];

    allStoresAreChosen
      ? this.setState({
          allStoresAreChosen: false,
          checkboxState: updatedCheckboxState,
          selectedStores: []
        })
      : this.setState({
          allStoresAreChosen: true,
          checkboxState: updatedCheckboxState,
          selectedStores: allStores
        });

    this.findNearestShops(
      this.state.selectedLocation,
      !allStoresAreChosen ? allStores : [],
      this.state.showTopN,
      this.state.showWaitingTime
    );
  }

  selectSingleStore(event) {
    const chosen = this.state.selectedStores;
    const choice = event.target.value;
    const updatedCheckboxState = this.state.checkboxState;

    if (!this.state.atLeastOneStoreNotPicked) {
      updatedCheckboxState["Any Store"] = false;
      this.setState({
        allStoresAreChosen: false,
        checkboxState: updatedCheckboxState
      });
    }

    updatedCheckboxState[choice] = !updatedCheckboxState[choice];

    chosen.indexOf(choice) < 0
      ? chosen.push(choice)
      : chosen.splice(chosen.indexOf(choice), 1);

    const lastOptionAlsoChosen = chosen.length === stores.length;

    if (lastOptionAlsoChosen) {
      updatedCheckboxState["Any Store"] = true;
    }

    this.setState({
      checkboxState: updatedCheckboxState,
      selectedStores: chosen,
      allStoresAreChosen: lastOptionAlsoChosen ? true : false
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
      showTopN: newLimit
    });

    this.findNearestShops(
      this.state.selectedLocation,
      this.state.selectedStores,
      newLimit,
      this.state.showWaitingTime
    );
  }

  selectMinutes(event) {
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
    for (let shop of listing) {
      calculateOpeningHours(shop);
    }
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
    const {
      loggedInUser,
      navBarPath,
      navBarDisplay,
      allStoresAreChosen,
      checkboxState,
      limits,
      minutes,
      nearestShops
    } = this.state;
    return (
      <React.Fragment>
        <NavBar
          loggedInUser={loggedInUser}
          navBarPath={navBarPath}
          navBarDisplay={navBarDisplay}
        />
        <div data-testid="bubble-tea-locator-page">
          <Search
            stores={stores}
            allStoresAreChosen={allStoresAreChosen}
            selectAllStores={this.selectAllStores.bind(this)}
            selectSingleStore={this.selectSingleStore.bind(this)}
            checkboxState={checkboxState}
            userLocation={userLocation}
            onChange={this.selectLocation.bind(this)}
          />
          <Filters
            limits={limits}
            selectLimit={this.selectLimit.bind(this)}
            minutes={minutes}
            selectMinutes={this.selectMinutes.bind(this)}
          />
          <Listing nearestShops={nearestShops} />
        </div>
      </React.Fragment>
    );
  }
}

export default BubbleTeaLocator;
