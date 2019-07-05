import React from "react";
import "../styles/DrinkAdder.css";

function DrinkAdder(props) {
  return (
    <form className="add-drink-form">
      <div className="single-inputs">
        <div>
          <label htmlFor="drink">Drink:</label>
          <input type="text" name="drink" onChange={props.handleDrink} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" onChange={props.handlePrice} />
        </div>
        <div>
          <label htmlFor="sugar-level">Sugar Level:</label>
          <input
            type="number"
            name="sugar-level"
            onChange={props.handleSugarLevel}
          />
        </div>
        <div>
          <label htmlFor="date-bought">Date Bought</label>
          <input
            type="date"
            name="date-bought"
            onChange={props.handleDateBought}
          />
        </div>
      </div>
      <div className="multiple-selects">
        <div>
          <label htmlFor="store">Store:</label>
          <select name="store" onChange={props.handleStore}>
            <option value="Koi">Koi</option>
            <option value="LiHo">LiHo</option>
            <option value="Tiger Sugar">Tiger Sugar</option>
            <option value="Gong Cha">Gong Cha</option>
            <option value="Ten Ren">Ten Ren</option>
          </select>
        </div>
        <div>
          <label htmlFor="toppings">Toppings:</label>
          <select multiple name="toppings" onChange={props.handleToppings}>
            <option value="Tapioca Pearls">Tapioca Pearls</option>
            <option value="White Pearls">White Pearls</option>
            <option value="Herbal Jelly">Herbal Jelly</option>
            <option value="Konjac">Konjac</option>
            <option value="3J">3J</option>
          </select>
        </div>
      </div>
      <input type="submit" value="Add Drink" onClick={props.addDrink} />
    </form>
  );
}

export default DrinkAdder;
