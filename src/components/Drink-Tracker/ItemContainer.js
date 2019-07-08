import React from "react";

function ItemContainer({
  drinkToEditId,
  drink,
  inEditMode,
  deleteDrink,
  triggerEdit,
  confirmEdit,
  handleDrink,
  handlePrice,
  handleSugarLevel,
  handleStore,
  handleToppings,
  handleDateBought
}) {
  if (drinkToEditId === drink._id && inEditMode) {
    return (
      <li key={drink._id}>
        <input type="text" placeholder={drink.drink} onChange={handleDrink} />

        <input type="text" placeholder={drink.price} onChange={handlePrice} />
        <input
          type="text"
          placeholder={drink.sugarLevel}
          onChange={handleSugarLevel}
        />
        <input type="text" placeholder={drink.store} onChange={handleStore} />

        <button name={drink._id} onClick={confirmEdit}>
          CONFIRM EDIT
        </button>
        <button name={drink._id} onClick={deleteDrink}>
          DELETE
        </button>
      </li>
    );
  }
  return (
    <li key={drink._id}>
      <div>{drink.drink}</div>
      <div>{drink.price}</div>
      <div>{drink.sugarLevel}</div>
      <div>{drink.store}</div>

      <button name={drink._id} onClick={triggerEdit}>
        EDIT
      </button>
      <button name={drink._id} onClick={deleteDrink}>
        DELETE
      </button>
    </li>
  );
}

export default ItemContainer;
