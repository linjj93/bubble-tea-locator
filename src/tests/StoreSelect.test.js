import React from "react";
import StoreSelect from "../components/StoreSelect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

const testStores = ["ABC", "123", "#@$%$^%", "ILuvBBT"];

describe("check rendering of component", () => {
  test("renders a select menu with label- Which Store?", () => {
    const { getByLabelText } = render(<StoreSelect stores={testStores} />);
    const storeMenu = getByLabelText("Which Store?");
    expect(storeMenu).toBeInTheDocument();
  });

  test("renders a select menu with no option selected at all", () => {
    const { getByLabelText } = render(<StoreSelect stores={testStores} />);
    const storeMenu = getByLabelText("Which Store?");
    expect(storeMenu).toHaveValue([]);
  });
});

describe("check functionality of select menu", () => {
  test("select 1 option", () => {
    const { getByLabelText } = render(<StoreSelect stores={testStores} />);
    const storeMenu = getByLabelText("Which Store?");
    fireEvent.change(storeMenu, { target: { value: testStores[3] } });
    expect(storeMenu).toHaveValue(["ILuvBBT"]);
  });

  test("select multiple consecutive options", () => {
    const { getByLabelText } = render(<StoreSelect stores={testStores} />);
    const storeMenu = getByLabelText("Which Store?");
    fireEvent.change(storeMenu, {
      target: { selectedOptions: testStores }
    });
    // fireEvent.click(storeMenu, {
    //   target: { value: testStores[1] }
    // });
    // console.log(storeMenu);
    expect(storeMenu).toHaveValue(["ABC", "123"]);
  });
});
