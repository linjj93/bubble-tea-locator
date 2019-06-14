import React from "react";
import App from "../components/App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

//at App level, check that individual components appear in the app, no need to check their text content
describe("test starting UI", () => {
  test("default UI should contain prompt message ", () => {
    const { getByText, getByTestId, getByLabelText } = render(<App />);
    const storeMenu = getByLabelText("Which Store(s)?");
    const locationMenu = getByLabelText("Where Are You?");
    const shopsListing = getByTestId("listing");
    const promptMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(storeMenu).toBeInTheDocument();
    expect(locationMenu).toBeInTheDocument();
    expect(shopsListing).toBeInTheDocument();
    expect(promptMessage).toBeInTheDocument();
  });
});

describe("test effect of StoreSelect menu", () => {
  // positive test case
  test("when user chooses Gong Cha, Gong Cha shows on listing", () => {
    const { getByLabelText, getAllByText, getAllByAltText } = render(<App />);
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
    fireEvent.change(storeMenu, { target: { value: "Gong Cha" } });
    expect(storeMenu).toHaveValue(["Gong Cha"]);
    const populatedListing = getAllByText("Select Location First");
    populatedListing.map(shop => expect(shop).toBeInTheDocument());
    const populatedStore = getAllByAltText("Gong Cha");
    populatedStore.map(store => expect(store).toBeInTheDocument());
  });

  // negative test case
  test("when user chooses Tiger Sugar, Koi does not show on listing", () => {
    const { queryAllByAltText, getByLabelText } = render(<App />);
    const storeMenu = getByLabelText("Which Store(s)?");
    fireEvent.change(storeMenu, { target: { value: "Tiger Sugar" } });
    expect(storeMenu).toHaveValue(["Tiger Sugar"]);
    const storeNotChosen = queryAllByAltText("Koi");
    expect(storeNotChosen).toEqual([]);
  });
});

describe("test effect of NumberLimit menu", () => {
  test("shows only 2 shops when user selects to see 2 shops", () => {
    const { getByLabelText, getAllByAltText, getByTestId } = render(<App />);
    const storeSelect = getByLabelText("Which Store(s)?");
    const locationSelect = getByLabelText("Where Are You?");
    const limitSelect = getByTestId("limit-select");
    fireEvent.change(storeSelect, { target: { value: "Gong Cha" } });
    fireEvent.change(locationSelect, {
      target: { value: "Raffles Place MRT" }
    });
    fireEvent.change(limitSelect, { target: { value: 2 } });

    const logoSearch = getAllByAltText("Gong Cha");
    let numOfShops = 0;
    logoSearch.map(shop => numOfShops++);

    expect(numOfShops).toEqual(2);
  });
});

describe("test effect of WaitingTimeLimit menu", () => {
  test("filters out shops with less than or equal to 30 minutes waiting time when 30 is picked", () => {
    const { getByLabelText, getByText, getAllByTestId } = render(<App />);
    const storeSelect = getByLabelText("Which Store(s)?");
    const locationSelect = getByLabelText("Where Are You?");
    const waitingTime = getByText("50");
    fireEvent.change(storeSelect, { target: { value: "Koi" } });
    expect(storeSelect).toHaveValue(["Koi"]);
    fireEvent.change(locationSelect, {
      target: { value: "Raffles Place MRT" }
    });
    fireEvent.change(waitingTime, { target: { value: "30" } });
    const waitingTimeColumn = getAllByTestId("waiting-time");
    waitingTimeColumn.map(time =>
      expect(
        parseInt(time.textContent.replace(" minutes", ""))
      ).toBeLessThanOrEqual(30)
    );
  });
});

describe("test effects of StoreSelect and LocationSelect menu", () => {
  test("when user selects location without selecting store, app stays at default", () => {
    const { getByLabelText, getByText } = render(<App />);
    const storeSelect = getByLabelText("Which Store(s)?");
    const locationSelect = getByLabelText("Where Are You?");
    expect(storeSelect).toBeInTheDocument();

    fireEvent.change(locationSelect, { target: { value: "Chinatown MRT" } });
    expect(locationSelect).toHaveValue("Chinatown MRT");
    const populatedListing = getByText(
      "Select the store you like and your location!"
    );
    expect(populatedListing).toHaveTextContent(
      "Select the store you like and your location!"
    );
  });

  test("when user selects location and LiHo, list of LiHo shops are populated", () => {
    const { getByLabelText, getAllByAltText, getAllByTestId } = render(<App />);
    const storeSelect = getByLabelText("Which Store(s)?");
    const locationSelect = getByLabelText("Where Are You?");
    fireEvent.change(storeSelect, { target: { value: "LiHo" } });
    expect(storeSelect).toHaveValue(["LiHo"]);
    fireEvent.change(locationSelect, { target: { value: "Telok Ayer MRT" } });
    expect(locationSelect).toHaveValue("Telok Ayer MRT");
    const populatedStore = getAllByAltText("LiHo");
    populatedStore.map(store => expect(store).toBeInTheDocument);
    const distances = getAllByTestId("distance");
    for (let i = 1; i < distances.length; i++) {
      expect(parseFloat(distances[i].textContent)).toBeGreaterThanOrEqual(
        parseFloat(distances[i - 1].textContent)
      );
    }
  });
});

describe("test shops listing's sorting functions", () => {});
