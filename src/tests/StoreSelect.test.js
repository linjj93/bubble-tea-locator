import React from "react";
import StoreSelect from "../components/Find-A-Shop/StoreSelect";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { stores, checkboxState } from "../data/stores";

describe("check rendering of component", () => {
  test("renders a select menu with label- Which Store(s)?", () => {
    const { getByLabelText } = render(
      <StoreSelect stores={stores} checkboxState={checkboxState} />
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
  });

  test("renders a select menu with no option selected at all", () => {
    const { getByLabelText } = render(
      <StoreSelect stores={stores} checkboxState={checkboxState} />
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toHaveFormValues([]);
    expect(storeMenu).toHaveTextContent("Any Store");
    expect(storeMenu).toHaveTextContent("Gong Cha");
    expect(storeMenu).toHaveTextContent("Koi");
    expect(storeMenu).toHaveTextContent("LiHo");
    expect(storeMenu).toHaveTextContent("Ten Ren");
    expect(storeMenu).toHaveTextContent("Tiger Sugar");
  });
});

describe("check functionality of select menu", () => {
  test("select 1 option", () => {
    checkboxState["Gong Cha"] = true;
    const { getByLabelText } = render(
      <StoreSelect stores={stores} checkboxState={checkboxState} />
    );
    const gongCha = getByLabelText("Gong Cha");
    const koi = getByLabelText("Koi");

    fireEvent.click(gongCha);
    expect(gongCha).toHaveAttribute("checked", "");
    expect(koi).not.toHaveAttribute("checked", "");
  });
});
