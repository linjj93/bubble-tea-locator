import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import NavBar from "../components/NavBar";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("rendering of navigation bar", () => {
  test("renders Nav Bar with text", () => {
    const { getByText } = render(
      <Router>
        <NavBar />
      </Router>
    );
    const dashboardLink = getByText("Dashboard");
    const logoutLink = getByText("Logout");
    expect(dashboardLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });
});
