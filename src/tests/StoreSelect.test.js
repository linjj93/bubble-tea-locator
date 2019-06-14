import React from "react";
import StoreSelect from "../components/StoreSelect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { stores } from "../assets/brands";

describe("check rendering of component", () => {
  test("renders a select menu with label- Which Store(s)?", () => {
    const { getByLabelText } = render(<StoreSelect stores={stores} />);
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
  });

  test("renders a select menu with no option selected at all", () => {
    const { getByLabelText } = render(<StoreSelect stores={stores} />);
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toHaveValue([]);
  });
});

describe("check functionality of select menu", () => {
  test("select 1 option", () => {
    const { getByLabelText } = render(<StoreSelect stores={stores} />);
    const storeMenu = getByLabelText("Which Store(s)?");
    fireEvent.change(storeMenu, { target: { value: stores[3] } });
    expect(storeMenu).toHaveValue(["Ten Ren"]);
  });

  xtest("select multiple consecutive options", () => {
    const { getByLabelText } = render(<StoreSelect stores={stores} />);
    const storeMenu = getByLabelText("Which Store(s)?");
    fireEvent.change(storeMenu, {
      target: { selectedOptions: stores }
    });
    // fireEvent.click(storeMenu, {
    //   target: { value: stores[1] }
    // });
    // console.log(storeMenu);
    expect(storeMenu).toHaveValue(["ABC", "123"]);
  });
});
