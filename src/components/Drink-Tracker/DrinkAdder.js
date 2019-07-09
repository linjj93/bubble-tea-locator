import React from "react";
import "../../styles/DrinkAdder.css";

function DrinkAdder({
  handleChange,
  handleDateBought,
  handleStore,
  handleToppings,
  addDrink
}) {
  return (
    <form autoComplete="off" className="add-drink-form">
      <div className="single-inputs">
        <div>
          <label htmlFor="drink">Drink:</label>
          <input type="text" name="drink" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="sugar-level">Sugar Level:</label>
          <input type="number" name="sugar-level" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date-bought">Date Bought</label>
          <input type="date" name="date-bought" onChange={handleDateBought} />
        </div>
      </div>
      <div className="multiple-selects">
        <div>
          <label htmlFor="store">Store:</label>
          <select defaultValue="Koi" name="store" onChange={handleStore}>
            <option value="Koi">Koi</option>
            <option value="LiHo">LiHo</option>
            <option value="Tiger Sugar">Tiger Sugar</option>
            <option value="Gong Cha">Gong Cha</option>
            <option value="Ten Ren">Ten Ren</option>
          </select>
        </div>
        <div>
          <label htmlFor="toppings">Toppings:</label>
          <select multiple name="toppings" onChange={handleToppings}>
            <option value="Tapioca Pearls">Tapioca Pearls</option>
            <option value="White Pearls">White Pearls</option>
            <option value="Herbal Jelly">Herbal Jelly</option>
            <option value="Konjac">Konjac</option>
            <option value="3J">3J</option>
          </select>
        </div>
      </div>
      <input type="submit" value="Add Drink" onClick={addDrink} />
    </form>
  );
}

export default DrinkAdder;
