import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import { App } from "../components/App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("test navigation", () => {
  test("App renders login form", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId, queryByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  test("landing on a bad page shows no match component", () => {
    const history = createMemoryHistory({
      initialEntries: ["/something-that-does-not-match"]
    });
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByText("Page Not Found")).toBeInTheDocument();
    expect(getByTestId("page-not-found")).toBeInTheDocument();
  });
});
