import React from "react";
import LocationSelect from "../components/LocationSelect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { userLocation } from "../assets/locationChoices";

describe("check rendering of component", () => {
  test("renders a select menu with label - where are you?", () => {
    const { getByLabelText } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);
    expect(selectMenu).toBeInTheDocument();
  });

  test.only("renders a select menu with default value as Select Location", () => {
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
    const { getByLabelText, getByText } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByLabelText(/where are you?/i);

    expect(selectMenu).toBeInTheDocument();
    fireEvent.change(selectMenu, { target: { value: "Downtown MRT" } });
    expect(selectMenu).toHaveValue("Downtown MRT");
  });

  test("user cannot re-select Select Location (default value) after first selection", () => {
    const { getByText, getByTitle } = render(
      <LocationSelect userLocation={userLocation} />
    );
    const selectMenu = getByTitle("location-select");
    expect(selectMenu).toHaveValue("Select Location");
    const disabledOption = getByText("Select Location");
    expect(disabledOption).toBeDisabled();
    fireEvent.change(selectMenu, { target: { value: "Chinatown MRT" } });
    console.log(selectMenu.value);
    // expect(selectMenu).toHaveFormValues("Chinatown MRT");
    expect(selectMenu).toHaveValue("Chinatown MRT");
    // expect(chosen).toBeDisabled();
    // expect(notChosen).toBeEnabled();

    // expect(selectMenu).toHaveValue("Chinatown MRT");
    // fireEvent.click(selectMenu, { target: { value: "Select Location" } });
    // expect(selectMenu).toHaveValue("Select Location");
  });
});

// const chosen = getByText("Chinatown MRT");
// expect(chosen).toBeEnabled();
