import React from "react";
import LocationSelect from "../components/LocationSelect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const testUserLocation = [
  { id: "loc1", name: "location 1" },
  { id: "loc2", name: "location 2" },
  { id: "loc3", name: "location 3" }
];

describe("check rendering of component", () => {
  test("renders a select menu with label - where are you?", () => {
    const { getByLabelText } = render(
      <LocationSelect userLocation={testUserLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);
    expect(selectMenu).toBeInTheDocument();
  });

  test("renders a select menu with default value as Choose Location", () => {
    const { getByText } = render(
      <LocationSelect userLocation={testUserLocation} />
    );
    const selectMenu = getByText(/choose location/i);
    expect(selectMenu).toHaveTextContent(/choose location/i);
  });
});

describe("check functionality of select menu", () => {
  test("changes value to location 1 when location 1 is picked", () => {
    const { getByLabelText, getByText } = render(
      <LocationSelect userLocation={testUserLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);
    expect(selectMenu).toBeInTheDocument();
    fireEvent.change(selectMenu, { target: { value: "location 1" } });
    const changedSelectMenu = getByText("location 1");
    expect(changedSelectMenu).toHaveTextContent("location 1");
  });

  //   test("user cannot re-select Choose Location again", () => {
  //     const { getByLabelText, getByText } = render(
  //       <LocationSelect userLocation={testUserLocation} />
  //     );
  //     const selectMenu = getByLabelText(/where are you?/i);
  //     expect(selectMenu).toBeInTheDocument();
  //     fireEvent.change(selectMenu, { target: { value: "location 2" } });
  //     const changedSelectMenu = getByText("location 2");
  //     expect(changedSelectMenu).toHaveTextContent("location 2");
  //     fireEvent.change(selectMenu);
  //   });
});
