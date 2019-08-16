import React from "react";
import Tracker from "../components/Drink-Tracker/Tracker";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("default ui", () => {
  it("should render the tracker", () => {
    const { getByText } = render(
      <Router>
        <Tracker />
      </Router>
    );
    const drinkHeader = getByText("Drink");
    const priceHeader = getByText("Price");
    const sugarLevelHeader = getByText("Sugar Level");
    const storeHeader = getByText("Store");
    const toppingsHeader = getByText("Toppings");
    const dateBoughtHeader = getByText("Date Bought");
    expect(drinkHeader).toBeInTheDocument();
    expect(priceHeader).toBeInTheDocument();
    expect(sugarLevelHeader).toBeInTheDocument();
    expect(storeHeader).toBeInTheDocument();
    expect(toppingsHeader).toBeInTheDocument();
    expect(dateBoughtHeader).toBeInTheDocument();
  });
});
