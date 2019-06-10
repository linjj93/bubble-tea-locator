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
      shops,
      brands,
      userLocation,
      selectedBrands: [],
      selectedLocation: {},
      nearestShops: []
    };
  }

  extractChosenLocation(event) {
    for (let locObj of this.state.userLocation) {
      if (event.target.value === locObj.name) {
        this.setState({
          selectedLocation: locObj
        });
        break;
      }
    }

    this.findNearestShops();
  }

  extractChosenBrands(event) {
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
    if (this.state.selectedLocation === undefined) {
      return;
    } else {
      const originLat = this.state.selectedLocation.latitude;
      const originLong = this.state.selectedLocation.longitude;
      let Listing = this.state.shops;
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

      this.setState({
        nearestShops: Listing
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div class="search-wrapper">
          <Brands
            brands={this.state.brands}
            onChange={this.extractChosenBrands.bind(this)}
          />
          <LocationSelect
            onChange={this.extractChosenLocation.bind(this)}
            userLocation={this.state.userLocation}
          />
        </div>
        <Listing nearestShops={this.state.nearestShops} />
      </React.Fragment>
    );
  }
}

export default App;
