import React from "react";
import axios from "axios";
import NavBar from "../NavBar";
import "../../styles/Tracker.css";
import { setAuthorizationHeader } from "../../utils/helper";
import { Table, Button } from "reactstrap";
import DrinkAdder from "./DrinkAdder";

const host = process.env.REACT_APP_URL || "http://localhost:3002";

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
      drinkToEditId: "",
      modalIsOpen: false
    };
  }

  handleChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
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
    const chosenToppings = this.state.toppings;
    const targetTopping = event.target.id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    event.target.checked
      ? chosenToppings.push(targetTopping)
      : chosenToppings.splice(chosenToppings.indexOf(targetTopping), 1);

    this.setState({
      toppings: chosenToppings
    });
  }

  async componentDidMount() {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !this.state.loggedInUser) {
      await axios({
        method: "get",
        url: host + "/users/userprofile",
        headers: { Authorization: "Bearer " + jwt }
      })
        .then(res => {
          this.setState({
            message: `Welcome, ${res.data.username}!`,
            loggedInUser: res.data.username
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }

    await axios({
      method: "get",
      url: `${host}/users/${this.state.loggedInUser}/drinks`,
      headers: setAuthorizationHeader()
    })
      .then(res => {
        this.setState({
          drinks: res.data.drinks
        });
      })
      .catch(err => console.log(err.message));
  }

  async addDrink(event) {
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
    await axios({
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
          drinks: res.data.drinksAfterAddition,
          modalIsOpen: false
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

  openForm = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  confirmEdit(event) {
    const {
      drinkToEditId,
      loggedInUser,
      drink,
      price,
      sugarLevel,
      store,
      dateBought,
      toppings
    } = this.state;

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
      loggedInUser,
      navBarPath,
      navBarDisplay,
      modalIsOpen,
      drinks
    } = this.state;
    const listOfDrinks = drinks.map((drink, index) => (
      <tr key={drink._id}>
        <th scope="row">{index + 1}</th>
        <td>{drink.drink}</td>
        <td>{drink.price}</td>
        <td>{drink.sugarLevel}%</td>
        <td>{drink.store}</td>
        <td>
          {drink.toppings.map(topping => (
            <p>{topping}</p>
          ))}
        </td>
        <td>{drink.dateBought.slice(0, 10)}</td>
      </tr>
    ));
    return (
      <React.Fragment>
        <NavBar
          loggedInUser={loggedInUser}
          navBarPath={navBarPath}
          navBarDisplay={navBarDisplay}
        />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Drink</th>
              <th>Price</th>
              <th>Sugar Level</th>
              <th>Store</th>
              <th>Toppings</th>
              <th>Date Bought</th>
            </tr>
          </thead>
          <tbody>{listOfDrinks}</tbody>
        </Table>
        <Button onClick={this.openForm}>Add Drink</Button>

        <DrinkAdder
          modalIsOpen={modalIsOpen}
          addDrink={this.addDrink.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleToppings={this.handleToppings.bind(this)}
          handleDateBought={this.handleDateBought.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default Tracker;
