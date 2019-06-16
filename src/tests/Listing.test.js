import React from "react";
import Listing from "../components/Listing";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { shops } from "../assets/shops";

const testShops = shops.slice(0, 3);
console.log(testShops);
const startingCondition = [];

describe("test rendering of component", () => {
  test("render Listing Component", () => {
    const { getByTestId } = render(
      <Listing nearestShops={startingCondition} />
    );
    const shopListing = getByTestId("listing");
    expect(shopListing).toBeInTheDocument();
  });

  test("Listing Component first rendered with prompt to user to select store and location", () => {
    const { getByText } = render(<Listing nearestShops={startingCondition} />);
    const shopListing = getByText(
      "Select the store you like and your location!"
    );
    expect(shopListing).toHaveTextContent(
      "Select the store you like and your location!"
    );
    expect(shopListing).toContainHTML(
      "<p>Select the store you like and your location!</p>"
    );
  });

  test("Listing Component rendered with list of shops", () => {
    const { getByTestId, getByText } = render(
      <Listing nearestShops={testShops} />
    );
    const shopListing = getByTestId("listing");
    expect(shopListing).toBeInTheDocument();
    const firstShop = getByText(testShops[0].name);
    const secondShop = getByText(testShops[1].name);
    const thirdShop = getByText(testShops[2].name);
    expect(firstShop).toBeInTheDocument();
    expect(secondShop).toBeInTheDocument();
    expect(thirdShop).toBeInTheDocument();
  });

  test("Listing Component rendered with list of shops, with prompt to Select Location First", () => {
    const { getAllByText } = render(<Listing nearestShops={testShops} />);
    const lastColumn = getAllByText("Select Location First");
    lastColumn.map(cell => expect(cell).toBeInTheDocument());
  });
});
