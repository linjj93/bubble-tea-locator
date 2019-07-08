import React from "react";
import axios from "axios";
import DrinkAdder from "./DrinkAdder";
import NavBar from "../NavBar";
import ItemContainer from "./ItemContainer";
import "../../styles/Tracker.css";
import { setAuthorizationHeader } from "../../utils/helper";
// const host = "https://jj-bubble-tea-app.herokuapp.com" || "http://localhost:3001";
const host = process.env.REACT_APP_URL || "http://localhost:3001";
// const host = "http://localhost:3001";
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
      navBarDisplay: "Find a Shop",
      inEditMode: false,
      drinkToEditId: ""
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
      })
        .then(res => {
          this.setState({
            drinks: res.data.drinksLeft,
            confirmationMsg: "Drink deleted!"
          });
        })
        .catch(err =>
          this.setState({
            confirmationMsg: err.response.data.message || err.message
          })
        );
    }
  }

  triggerEdit(event) {
    const drinkToEditId = event.target.name;
    this.setState({
      drinkToEditId,
      inEditMode: true
    });
  }

  confirmEdit(event) {
    const {
      drinks,
      drinkToEditId,
      loggedInUser,
      drink,
      price,
      sugarLevel,
      store,
      dateBought,
      toppings
    } = this.state;

    const drinkToEdit = drinks.find(
      drink => drink._id === this.state.drinkToEditId
    );

    axios({
      method: "put",
      url: `${host}/users/${loggedInUser}/${drinkToEditId}`,
      data: {
        drink,
        price,
        sugarLevel,
        store,
        dateBought,
        toppings
      },
      headers: setAuthorizationHeader()
    }).then(res => {
      this.setState({
        drinks: res.data.drinksAfterUpdate
      }).catch(err =>
        this.setState({
          confirmationMsg: err.response.data.message || err.message
        })
      );
    });

    this.setState({
      drinkToEditId: "",
      inEditMode: false
    });
  }

  render() {
    const {
      drinks,
      confirmationMsg,
      loggedInUser,
      navBarPath,
      navBarDisplay,
      inEditMode,
      drinkToEditId
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
            <li className="table-header">
              <div>Drink</div>
              <div>Price</div>
              <div>Sugar Level</div>
              <div>Store</div>
              <div>Edit Item</div>
              <div>Delete Item</div>
            </li>
            {drinks.map(drink => (
              <ItemContainer
                className="item-container"
                drinkToEditId={drinkToEditId}
                drink={drink}
                inEditMode={inEditMode}
                deleteDrink={this.deleteDrink.bind(this)}
                triggerEdit={this.triggerEdit.bind(this)}
                handleDrink={this.handleDrink.bind(this)}
                handlePrice={this.handlePrice.bind(this)}
                handleSugarLevel={this.handleSugarLevel.bind(this)}
                handleStore={this.handleStore.bind(this)}
                handleToppings={this.handleToppings.bind(this)}
                handleDateBought={this.handleDateBought.bind(this)}
              />
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
