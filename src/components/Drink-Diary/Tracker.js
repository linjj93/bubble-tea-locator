import React from "react";
import axios from "axios";
import DrinkAdder from "./DrinkAdder";
import NavBar from "../NavBar";
import "../../styles/Tracker.css";
import { setAuthorizationHeader } from "../../utils/helper";

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
      dateBought: "",
      navBarPath: "/find-a-shop",
      navBarDisplay: "Find a Shop"
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
      store: chosenStore.value
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
    const {
      drinks,
      confirmationMsg,
      loggedInUser,
      navBarPath,
      navBarDisplay
    } = this.state;

    return (
      <React.Fragment>
        <NavBar
          loggedInUser={loggedInUser}
          navBarPath={navBarPath}
          navBarDisplay={navBarDisplay}
        />

        <div>
          <ul>
            {drinks.map((drink, index) => (
              <li key={drink._id}>
                <div>{drink.drink}</div>
                <div>{drink.price}</div>
                <div>{drink.sugarLevel}</div>
                <div>{drink.store}</div>

                <button name={drink._id} onClick={this.deleteDrink.bind(this)}>
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>

        <DrinkAdder
          addDrink={this.addDrink.bind(this)}
          handleDrink={this.handleDrink.bind(this)}
          handlePrice={this.handlePrice.bind(this)}
          handleSugarLevel={this.handleSugarLevel.bind(this)}
          handleStore={this.handleStore.bind(this)}
          handleToppings={this.handleToppings.bind(this)}
          handleDateBought={this.handleDateBought.bind(this)}
        />

        <p>{confirmationMsg}</p>
      </React.Fragment>
    );
  }
}

export default Tracker;
