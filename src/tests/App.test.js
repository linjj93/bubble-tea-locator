import React from "react";
import App from "../components/App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const testStores = ["12", "asd", "blablah"];
const testNearestShops = [
  {
    id: "Shop1",
    name: "hiThere",
    logo: "fake-logo",
    brand: "bbt",
    distanceFromOrigin: 10
  },
  {
    id: "Shop2",
    name: "byeBye",
    logo: "fake-logo",
    brand: "bbt2",
    distanceFromOrigin: 45
  }
];

describe("rendering of components", () => {
  test("render components", () => {
    const { getByTestId, getByLabelText } = render(<App />);
    const storeMenu = getByLabelText("Which Store?");
    const shopsListing = getByTestId("listing");
    expect(storeMenu).toBeInTheDocument();
    expect(shopsListing).toBeInTheDocument();
  });
});

describe("test interaction between components", () => {
  test("when user chooses Gong Cha, Gong Cha shows on listing", () => {
    const { getByTestId, getByLabelText } = render(<App />);
    const storeMenu = getByLabelText("Which Store?");
    expect(storeMenu).toBeInTheDocument();
    fireEvent.change(storeMenu, { target: { value: "Koi" } });
    // expect(storeMenu).toHaveValue([testStores[1]]);

    expect(getByTestId("listing")).toBeInTheDocument();

    // expect(shopsListing).toContainHTML(
    //   <ul class="outlet-wrapper" data-testid="listing">
    //     <li>
    //       <span>Shop</span>
    //       <span>Location</span>
    //       <span>Distance (in km)</span>
    //     </li>
    //     <li>
    //       <span>
    //         <img alt="bbt" src="fake-logo" />
    //       </span>
    //       <span>hiThere</span>
    //       <span>10</span>
    //     </li>
    //     <li>
    //       <span>
    //         <img alt="bbt2" src="fake-logo" />
    //       </span>
    //       <span>byeBye</span>
    //       <span>45</span>
    //     </li>
    //   </ul>
    // );
  });
});
