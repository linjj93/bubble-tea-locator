import React from "react";
import BrandSelect from "./BrandSelect";
import LocationSelect from "./LocationSelect";
import Listing from "./Listing";
import "../styles/App.css";
import { brands, userLocation, shops } from "../assets/data";
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

  findNearestShops(event) {
    const newSelection = event.target.value;
    let Listing = shops;
    for (let locObj of userLocation) {
      if (newSelection === locObj.name) {
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
        Listing = Listing.filter(shop =>
          this.state.selectedBrands.includes(shop.brand)
        );
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

  selectLocation(event) {
    const newSelection = event.target.value;
    this.setState({ selectedLocation: newSelection });
    this.findNearestShops(event);
  }

  selectBrands(event) {
    const choices = event.target.options;
    const chosen = [];
    for (let choice of choices) {
      if (choice.selected) {
        chosen.push(choice.value);
      }
    }
    this.setState({
      selectedBrands: chosen
    });
    let Listing = shops;
    Listing = Listing.filter(shop => chosen.includes(shop.brand));
    let originLat;
    let originLong;
    for (let locObj of userLocation) {
      if (locObj.name === this.state.selectedLocation) {
        originLat = locObj.latitude;
        originLong = locObj.longitude;
      }
    }
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

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <BrandSelect
            brands={brands}
            onChange={this.selectBrands.bind(this)}
          />
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
