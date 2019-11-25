import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render, act } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import mockAxios from "jest-mock-axios";

const history = createMemoryHistory({
  initialEntries: ["/"]
});

const mockJwt = () => {
  const mockJwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDIzNjAzN2JkMmJmMTAwMTdlMTBhNGMiLCJpYXQiOjE1NjU5NDM3OTY4ODYsInVzZXIiOiJsaW5qajkzIiwiZXhwIjoxNTY1OTQzODA3Njg2fQ.A3RFy3fn4ssbfKixcWoI-K5Eav-3JC6Sy6L-1vL7HdM";

  jest
    .spyOn(window.sessionStorage.__proto__, "getItem")
    .mockReturnValue(mockJwtToken);
};

afterEach(() => {
  mockAxios.reset();
});

describe("check rendering of component", () => {
  test("homepage renders, showing a welcome message for user", async () => {
    mockJwt();

    const { getByText } = await render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );
    act(() => {
      mockAxios.mockResponse({ data: { username: "linjj93" } });
    });

    const welcomeMsg = await getByText("Welcome, linjj93!");

    expect(welcomeMsg).toBeInTheDocument();
  });

  test("show link to both find a shop and drink tracker", async () => {
    mockJwt();
    const { getByText } = await render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );
    act(() => {
      mockAxios.mockResponse({ data: { username: "linjj93" } });
    });
    const findAShop = await getByText("Find a Shop");
    const drinkTracker = await getByText("Drink Tracker");
    expect(findAShop).toBeInTheDocument();
    expect(drinkTracker).toBeInTheDocument();
  });
});
