import React from "react";
import DrinkAdder from "../components/Drink-Tracker/DrinkAdder";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const mockAddDrink = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleToppings = jest.fn();
const mockHandleDateBought = jest.fn();
const mockCloseForm = jest.fn();

describe("default UI", () => {
  it("should render the form", () => {
    const { getByText, getByLabelText } = render(
      <DrinkAdder
        modalIsOpen={true}
        addDrink={mockAddDrink}
        handleChange={mockHandleChange}
        handleToppings={mockHandleToppings}
        handleDateBought={mockHandleDateBought}
        closeForm={mockCloseForm}
      />
    );
    const formHeader = getByText("Add your Drink!");
    const drinkName = getByLabelText("Drink");
    const drinkPrice = getByLabelText("Price");
    const sugarLevel = getByLabelText("Sugar Level (%)");
    expect(formHeader).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(drinkPrice).toBeInTheDocument();
    expect(sugarLevel).toBeInTheDocument();
  });
});
