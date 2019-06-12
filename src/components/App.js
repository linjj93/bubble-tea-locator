import React from "react";
import StoreSelect from "./StoreSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import FilterNumberOfShops from "./FilterNumberOfShops";
import FilterWaitingTime from "./FilterWaitingTime";
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
      limits: ["all", 1, 2, 3, 4, 5],
      minutes: [10, 20, 30, 40, 50],
      showWaitingTime: 50,
      waitingTimeOrder: "↗",
      distanceOrder: "↗"
    };
  }

  sortShopsByDistanceAndTime(shopListing) {
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

  filterShopsByStore(shopListing, chosenStores) {
    return shopListing.filter(shop => chosenStores.includes(shop.brand));
  }

  filterShopsByWaitingTime(shopListing, duration) {
    return shopListing.filter(shop => shop.queueTime <= duration);
  }

  limitNumberOfShops(shopListing, n) {
    return shopListing.filter((shop, index) => index + 1 <= n);
  }

  sortByWaitingTime() {
    const listing = shops;
    const order = this.state.waitingTimeOrder;
    order === "↗"
      ? listing.sort((a, b) => (a.queueTime > b.queueTime ? 1 : -1))
      : listing.sort((a, b) => (a.queueTime < b.queueTime ? 1 : -1));
    order === "↗"
      ? this.setState({ waitingTimeOrder: "↘" })
      : this.setState({ waitingTimeOrder: "↗" });
  }

  sortByDistance() {
    const listing = shops;
    const order = this.state.distanceOrder;
    order === "↗"
      ? listing.sort((a, b) =>
          a.distanceFromOrigin > b.distanceFromOrigin ? 1 : -1
        )
      : listing.sort((a, b) =>
          a.distanceFromOrigin < b.distanceFromOrigin ? 1 : -1
        );
    order === "↗"
      ? this.setState({ distanceOrder: "↘" })
      : this.setState({ distanceOrder: "↗" });
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
      showTopN: newLimit
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

    listing = this.filterShopsByStore(listing, chosenStores);
    listing = this.filterShopsByWaitingTime(listing, showWaitingTime);
    listing = this.sortShopsByDistanceAndTime(listing);
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
