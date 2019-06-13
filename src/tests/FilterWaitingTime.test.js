import React from "react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import FilterWaitingTime from "../components/FilterWaitingTime";
import { render, fireEvent } from "@testing-library/react";

const minutes = [10, 20, 30, 40, 50];

describe("test rendering of component", () => {
  test("select menu renders with default value of 50", () => {
    const { getByText } = render(<FilterWaitingTime minutes={minutes} />);
    const timeDropdown = getByText("50");
    expect(timeDropdown).toBeInTheDocument();
  });
  test("select menu renders with descriptive text", () => {
    const { getByText } = render(<FilterWaitingTime minutes={minutes} />);
    const timeDropdownDesc = getByText("waiting time of", { exact: false });
    expect(timeDropdownDesc).toBeInTheDocument();
  });
});

describe("test toggling of component", () => {
  test("select menu should be able to toggle to another value", () => {
    const { getByText } = render(<FilterWaitingTime minutes={minutes} />);
    const timeDropdown = getByText("50");
    fireEvent.change(timeDropdown, { target: { value: 10 } });
    const timeDropdownToggled = getByText("10");
    expect(timeDropdownToggled).toBeInTheDocument();
  });
});
