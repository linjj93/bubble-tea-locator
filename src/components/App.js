import React from "react";
import Brands from "./Brands";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import { brands, userLocation, shops } from "../assets/data";
import "../styles/App.css";
import { calcDistance } from "../assets/helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBrands: [],
      selectedLocation: "None",
      nearestShops: []
    };
  }

  selectLocation(event) {
    this.setState({
      selectedLocation: event.target.value
    });
    this.findNearestShops();
  }

  selectBrands(event) {
    let choices = event.target.options;
    let chosen = [];
    for (let choice of choices) {
      if (choice.selected) {
        chosen.push(choice.value);
      }
    }
    this.setState({
      selectedBrands: chosen
    });

    this.findNearestShops();
  }

  findNearestShops() {
    let Listing = shops;
    for (let locObj of userLocation) {
      if (this.state.selectedLocation === locObj.name) {
        const originLat = locObj.latitude;
        const originLong = locObj.longitude;

        for (let shop of Listing) {
          shop.distanceFromOrigin = calcDistance(
            originLat,
            originLong,
            shop.latitude,
            shop.longitude
          );
          shop.distanceFromOrigin = shop.distanceFromOrigin.toFixed(3) * 1000;
        }

        Listing = Listing.sort((a, b) =>
          a.distanceFromOrigin > b.distanceFromOrigin ? 1 : -1
        );
        break;
      }
    }

    this.setState({
      nearestShops: Listing
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <Brands brands={brands} onChange={this.selectBrands.bind(this)} />
          <LocationSelect
            onChange={this.selectLocation.bind(this)}
            userLocation={userLocation}
            selectedLocation={this.state.selectedLocation}
          />
        </div>
        <Listing nearestShops={this.state.nearestShops} />
      </React.Fragment>
    );
  }
}

export default App;
