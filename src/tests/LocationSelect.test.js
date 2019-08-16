import React from "react";
import LocationSelect from "../components/Find-A-Shop/LocationSelect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { userLocation } from "../data/locationChoices";

describe("check rendering of component", () => {
  test("renders a select menu with label - where are you?", () => {
    const { getByLabelText } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);
    expect(selectMenu).toBeInTheDocument();
  });

  test("renders a select menu with default value as Select Location", () => {
    const { getByLabelText } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByLabelText("Where Are You?");
    expect(selectMenu).toHaveValue("Select Location");
    expect(selectMenu).toHaveTextContent("City Hall MRT", { exact: true });
  });
});

describe("check functionality of select menu", () => {
  test("changes value to Downtown MRT when Downtown MRT is picked", () => {
    const { getByLabelText } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);

    expect(selectMenu).toBeInTheDocument();
    fireEvent.change(selectMenu, { target: { value: "Downtown MRT" } });
    expect(selectMenu).toHaveValue("Downtown MRT");
  });
});
