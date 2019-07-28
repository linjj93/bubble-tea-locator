import React from "react";
import FilterNumberOfShops from "../components/Find-A-Shop/FilterNumberOfShops";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const testNumbers = ["all", 1, 2, 3, 4, 5];

describe("check rendering of component", () => {
  test("should render select menu with all option as default", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
  });
});

describe("check functionality of component", () => {
  test("should allow user to select other numbers from default", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[2] } });
    expect(chooseNumberMenu).toHaveValue("2");
  });

  test("should allow user to select all again", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[4] } });
    expect(chooseNumberMenu).toHaveValue("4");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[0] } });
    expect(chooseNumberMenu).toHaveTextContent("all");
  });
});
