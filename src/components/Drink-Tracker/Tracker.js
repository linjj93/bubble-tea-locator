import React from "react";
import axios from "axios";
import NavBar from "../NavBar";
import "../../styles/Tracker.css";
import { setAuthorizationHeader } from "../../utils/helper";
import { Table, Button } from "reactstrap";
import DrinkAdder from "./DrinkAdder";

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

  handleChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  handleDateBought = event => {
    this.setState({
      dateBought: event.target.value
    });
  };

  handleStore = event => {
    const choices = event.target.options;
    const chosenStore = Array.from(choices).find(choice => choice.selected);
    this.setState({
      store: chosenStore.value
    });
  };

  handleToppings = event => {
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
  };

  async componentDidMount() {
    const jwt = sessionStorage.getItem("JWT");
    if (jwt && !this.state.loggedInUser) {
      await axios({
        method: "get",
        url: process.env.REST_API_LOCATION + "/users/userprofile",
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
      url: `${process.env.REST_API_LOCATION}/users/${
        this.state.loggedInUser
      }/drinks`,
      headers: setAuthorizationHeader()
    })
      .then(res => {
        this.setState({
          drinks: res.data.drinks
        });
      })
      .catch(err => console.log(err.message));
  }

  addDrink = async event => {
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
      url: `${process.env.REST_API_LOCATION}/users/${loggedInUser}/drinks`,
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
  };

  deleteDrink = async event => {
    const userWantsToDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (userWantsToDelete) {
      const drinkToDeleteId = event.target.name;

      await axios({
        method: "delete",
        url: `${process.env.REST_API_LOCATION}/users/${
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
  };

  triggerEdit = event => {
    const drinkToEditId = event.target.name;
    this.setState({
      drinkToEditId,
      inEditMode: true
    });
  };

  openForm = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeForm = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  confirmEdit = async event => {
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

    await axios({
      method: "put",
      url: `${
        process.env.REST_API_LOCATION
      }/users/${loggedInUser}/${drinkToEditId}`,
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
  };

  render() {
    const {
      loggedInUser,
      navBarPath,
      navBarDisplay,
      modalIsOpen,
      drinks
    } = this.state;
    const listOfDrinks = drinks.map((drink, index) => (
      <tr key={drink._id} className="drink-row">
        <th scope="row">{index + 1}</th>
        <td>{drink.drink}</td>
        <td>{drink.price}</td>
        <td>{drink.sugarLevel}%</td>
        <td>{drink.store}</td>
        {populateToppings(drink)}
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
        <Button onClick={this.openForm} className="add-drink-button">
          Add Drink
        </Button>

        <DrinkAdder
          modalIsOpen={modalIsOpen}
          addDrink={this.addDrink}
          handleChange={this.handleChange}
          handleToppings={this.handleToppings}
          handleDateBought={this.handleDateBought}
          closeForm={this.closeForm}
        />
      </React.Fragment>
    );
  }
}

export default Tracker;

const populateToppings = drink => {
  return (
    <React.Fragment>
      {drink.toppings.length > 0 ? (
        <td>
          {drink.toppings.map((topping, index) => (
            <span>
              {topping} {index !== drink.toppings.length - 1 && "/"}
            </span>
          ))}
        </td>
      ) : (
        <td>No Toppings</td>
      )}
    </React.Fragment>
  );
};
