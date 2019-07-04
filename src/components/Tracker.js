import React from "react";
import axios from "axios";
import NavBar from "./NavBar";

const host = "http://localhost:3001";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      newDrink: "",
      loggedInUser: "",
      confirmationMsg: "",
      drinkToDeleteId: ""
    };
  }

  componentDidMount() {
    let headers = {};
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      headers.Authorization = "Bearer " + jwt;
    }
    const { loggedInUser } = this.props.location.state;
    this.setState({
      loggedInUser
    });
    axios({
      method: "get",
      url: `${host}/users/${loggedInUser}/drinks`,
      headers
    })
      .then(res => {
        this.setState({
          drinks: res.data.drinks
        });
      })
      .catch(err => console.log(err.message));
  }

  handleChange(event) {
    this.setState({
      newDrink: event.target.value
    });
  }

  addDrink() {
    let headers = {};
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      headers.Authorization = "Bearer " + jwt;
    }
    axios({
      method: "post",
      url: `${host}/users/${this.state.loggedInUser}/drinks`,
      headers,
      data: {
        name: "",
        toppings: ["None"],
        price: 5,
        sugarLevel: 70,
        store: "Koi",
        dateBought: new Date().toISOString()
      }
    })
      .then(res => {
        console.log(res);
        this.setState({ confirmationMsg: "drink added!" });
      })
      .catch(err => console.log(err.message));
  }

  deleteDrink(event) {
    const userWantsToDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (userWantsToDelete) {
      const drinkToDeleteId = event.target.name;
      let headers = {};
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        headers.Authorization = "Bearer " + jwt;
      }
      axios({
        method: "delete",
        url: `${host}/users/${
          this.state.loggedInUser
        }/drinks/${drinkToDeleteId}`,
        headers
      }).then(res => {
        this.setState({
          drinks: res.data.drinksLeft,
          confirmationMsg: "Drink deleted!"
        });
      });
    }
  }

  render() {
    const { drinks, confirmationMsg } = this.state;
    return (
      <React.Fragment>
        <NavBar loggedInUser={this.state.loggedInUser} />
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
        <label>
          Add new drink
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            name="drink-name"
          />
          <input
            onClick={this.addDrink.bind(this)}
            type="submit"
            value="Add!"
          />
        </label>
        <p>{confirmationMsg}</p>
      </React.Fragment>
    );
  }
}

export default Tracker;
