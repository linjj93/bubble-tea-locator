import React from "react";
import FilterNumberOfShops from "../components/FilterNumberOfShops";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const testNumbers = ["all", 23, 92, 55, 10];

describe("check rendering of component", () => {
  test("should render select menu with all option as default", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
  });
});

describe("check functionality of component", () => {
  test("should allow user to select other numbers", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[3] } });
    expect(chooseNumberMenu).toHaveValue("55");
  });

  test("should allow user to select all again", () => {
    const { getByText } = render(<FilterNumberOfShops limits={testNumbers} />);
    const chooseNumberMenu = getByText("all");
    expect(chooseNumberMenu).toHaveTextContent("all");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[1] } });
    expect(chooseNumberMenu).toHaveValue("23");
    fireEvent.change(chooseNumberMenu, { target: { value: testNumbers[0] } });
    expect(chooseNumberMenu).toHaveTextContent("all");
  });
});
