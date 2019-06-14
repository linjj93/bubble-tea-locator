import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

describe("check rendering of component", () => {
  test("homepage renders, showing a dropdown for user", () => {
    const { getByLabelText } = render(<Home />);
    const homePage = getByLabelText("Looking for...");
    expect(homePage).toBeInTheDocument();
  });

  test("dropdown default value is Select a category", () => {
    const { getByDisplayValue } = render(<Home />);
    const defaultDropdown = getByDisplayValue("Select a category");
    expect(defaultDropdown).toBeInTheDocument();
  });
});
