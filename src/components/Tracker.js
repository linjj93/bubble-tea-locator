import React from "react";

import axios from "axios";
import NavBar from "./NavBar";
import "../styles/Tracker.css";
import { setAuthorizationHeader } from "../utils/helper";

const host = "http://localhost:3001";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      newDrink: "",
      loggedInUser: "",
      confirmationMsg: "",
      drinkToDeleteId: "",
      drink: "",
      price: 0,
      sugarLevel: 0,
      toppings: [],
      store: "",
      dateBought: ""
    };
  }

  handleDrink(event) {
    this.setState({
      drink: event.target.value
    });
  }
  handlePrice(event) {
    this.setState({
      price: event.target.value
    });
  }
  handleSugarLevel(event) {
    this.setState({
      sugarLevel: event.target.value
    });
  }
  handleDateBought(event) {
    this.setState({
      dateBought: event.target.value
    });
  }

  handleStore(event) {
    const choices = event.target.options;
    const chosenStore = Array.from(choices).find(choice => choice.selected);
    this.setState({
      store: chosenStore.toString()
    });
  }

  handleToppings(event) {
    const choices = event.target.options;
    const chosenToppings = [];

    for (let choice of choices) {
      if (choice.selected) {
        chosenToppings.push(choice.value);
      }
    }

    this.setState({
      toppings: chosenToppings
    });
  }

  componentDidMount() {
    const { loggedInUser } = this.props.location.state;

    this.setState({
      loggedInUser
    });
    axios({
      method: "get",
      url: `${host}/users/${loggedInUser}/drinks`,
      headers: setAuthorizationHeader()
    })
      .then(res => {
        this.setState({
          drinks: res.data.drinks,
          loggedInUser
        });
      })
      .catch(err => console.log(err.message));
  }

  addDrink(event) {
    event.preventDefault();
    const {
      drink,
      price,
      sugarLevel,
      store,
      dateBought,
      toppings,
      loggedInUser
    } = this.state;
    axios({
      method: "post",
      url: `${host}/users/${loggedInUser}/drinks`,
      headers: setAuthorizationHeader(),
      data: {
        drink,
        price,
        sugarLevel,
        store,
        dateBought,
        toppings
      }
    })
      .then(res => {
        this.setState({
          confirmationMsg: "drink added!",
          drinks: res.data.drinksAfterAddition
        });
      })
      .catch(err =>
        this.setState({
          confirmationMsg: err.response.data.message || err.message
        })
      );
  }

  deleteDrink(event) {
    const userWantsToDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (userWantsToDelete) {
      const drinkToDeleteId = event.target.name;

      axios({
        method: "delete",
        url: `${host}/users/${
          this.state.loggedInUser
        }/drinks/${drinkToDeleteId}`,
        headers: setAuthorizationHeader()
      }).then(res => {
        this.setState({
          drinks: res.data.drinksLeft,
          confirmationMsg: "Drink deleted!"
        });
      });
    }
  }

  render() {
    const { drinks, confirmationMsg, loggedInUser } = this.state;
    return (
      <React.Fragment>
        <NavBar loggedInUser={loggedInUser} />

        <div>
          <ul>
            {drinks.map((drink, index) => (
              <li key={drink._id}>
                {drink.name} ${drink.price} Sugar Level:
                {drink.sugarLevel}%{" "}
                <button name={drink._id} onClick={this.deleteDrink.bind(this)}>
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form autoComplete="off" className="add-drink-form">
          <div className="single-inputs">
            <div>
              <label htmlFor="drink">Drink:</label>
              <input
                type="text"
                name="drink"
                onChange={this.handleDrink.bind(this)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                onChange={this.handlePrice.bind(this)}
              />
            </div>
            <div>
              <label htmlFor="sugar-level">Sugar Level:</label>
              <input
                type="number"
                name="sugar-level"
                onChange={this.handleSugarLevel.bind(this)}
              />
            </div>
            <div>
              <label htmlFor="date-bought">Date Bought</label>
              <input
                type="date"
                name="date-bought"
                onChange={this.handleDateBought.bind(this)}
              />
            </div>
          </div>
          <div className="multiple-selects">
            <div>
              <label htmlFor="store">Store:</label>
              <select name="store" onChange={this.handleStore.bind(this)}>
                <option value="Koi">Koi</option>
                <option value="LiHo">LiHo</option>
                <option value="Tiger Sugar">Tiger Sugar</option>
                <option value="Gong Cha">Gong Cha</option>
                <option value="Ten Ren">Ten Ren</option>
              </select>
            </div>
            <div>
              <label htmlFor="toppings">Toppings:</label>
              <select
                multiple
                name="toppings"
                onChange={this.handleToppings.bind(this)}
              >
                <option value="Tapioca Pearls">Tapioca Pearls</option>
                <option value="White Pearls">White Pearls</option>
                <option value="Herbal Jelly">Herbal Jelly</option>
                <option value="Konjac">Konjac</option>
                <option value="3J">3J</option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Add Drink"
            onClick={this.addDrink.bind(this)}
          />
        </form>
        {/* <DrinkAdder
          addDrink={this.addDrink.bind(this)}
          handleDrink={this.handleDrink.bind(this)}
          handlePrice={this.handlePrice.bind(this)}
          handleSugarLevel={this.handleSugarLevel.bind(this)}
          handleStore={this.handleStore.bind(this)}
          handleToppings={this.handleToppings.bind(this)}
          handleDateBought={this.handleDateBought.bind(this)}
        /> */}
        <p>{confirmationMsg}</p>
      </React.Fragment>
    );
  }
}

export default Tracker;
