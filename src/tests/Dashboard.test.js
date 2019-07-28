import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
const history = createMemoryHistory({
  initialEntries: ["/"]
});
describe("check rendering of component", () => {
  test("homepage renders, showing a welcome message for user", async () => {
    const { getByText } = await render(
      <Router history={history}>
        <Dashboard location={{ state: { loggedInUser: "JJ" } }} />
      </Router>
    );
    const welcomeMsg = await getByText("Welcome, JJ!");
    expect(welcomeMsg).toBeInTheDocument();
  });

  test("show link to both find a shop and drink tracker", async () => {
    const { getByText } = await render(
      <Router history={history}>
        <Dashboard location={{ state: { loggedInUser: "JJ" } }} />
      </Router>
    );

    const findAShop = await getByText("Find a Shop");
    const drinkTracker = await getByText("Drink Tracker");
    expect(findAShop).toBeInTheDocument();
    expect(drinkTracker).toBeInTheDocument();
  });
});
