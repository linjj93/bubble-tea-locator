import React from "react";
import BubbleTeaLocator from "../components/BubbleTeaLocator";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { checkboxState } from "../assets/stores";

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
    const { getByLabelText, getAllByText, getAllByAltText, getByText } = render(
      <App />
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
    const checkBox = getByLabelText("Gong Cha");
    const defaultMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(defaultMessage).toBeInTheDocument();
    fireEvent.click(checkBox);
    const populatedListing = getAllByText("Select Location First");
    populatedListing.map(shop => expect(shop).toBeInTheDocument());
    const populatedStore = getAllByAltText("Gong Cha");
    populatedStore.map(store => expect(store).toBeInTheDocument());
  });

  test("select all options when Any Store is picked", () => {
    const { getByLabelText, getAllByAltText } = render(<App />);
    const gongCha = getByLabelText("Gong Cha");
    const koi = getByLabelText("Koi");
    const liHo = getByLabelText("LiHo");
    const tenRen = getByLabelText("Ten Ren");
    const tigerSugar = getByLabelText("Tiger Sugar");

    fireEvent.click(gongCha);
    fireEvent.click(koi);
    fireEvent.click(liHo);
    fireEvent.click(tenRen);
    fireEvent.click(tigerSugar);

    const gongChaShops = getAllByAltText("Gong Cha");
    const koiShops = getAllByAltText("Koi");
    const liHoShops = getAllByAltText("LiHo");
    const tenRenShops = getAllByAltText("Ten Ren");
    const tigerSugarShops = getAllByAltText("Tiger Sugar");

    const allShops = [
      ...gongChaShops,
      ...koiShops,
      ...liHoShops,
      ...tenRenShops,
      ...tigerSugarShops
    ];

    allShops.forEach(shop => expect(shop).toBeInTheDocument());
  });

  test("goes back to default when any store is checked, then unchecked", () => {
    const { getByLabelText, getAllByAltText, getByText } = render(<App />);
    const gongCha = getByLabelText("Gong Cha");
    const koi = getByLabelText("Koi");
    const liHo = getByLabelText("LiHo");
    const tenRen = getByLabelText("Ten Ren");
    const tigerSugar = getByLabelText("Tiger Sugar");

    fireEvent.click(gongCha);
    fireEvent.click(koi);
    fireEvent.click(liHo);
    fireEvent.click(tenRen);
    fireEvent.click(tigerSugar);

    const gongChaShops = getAllByAltText("Gong Cha");
    const koiShops = getAllByAltText("Koi");
    const liHoShops = getAllByAltText("LiHo");
    const tenRenShops = getAllByAltText("Ten Ren");
    const tigerSugarShops = getAllByAltText("Tiger Sugar");

    const allShops = [
      ...gongChaShops,
      ...koiShops,
      ...liHoShops,
      ...tenRenShops,
      ...tigerSugarShops
    ];

    allShops.forEach(shop => expect(shop).toBeInTheDocument());

    const anyStore = getByLabelText("Any Store");
    fireEvent.click(anyStore);
    const promptMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(promptMessage).toContainHTML(
      "<p>Select the store you like and your location!</p>"
    );
  });

  test("when user chooses Koi and LiHo, Koi and LiHo shops show on listing", () => {
    const { getByLabelText, getAllByText, getAllByAltText, getByText } = render(
      <App />
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
    const koi = getByLabelText("Koi");
    const liHo = getByLabelText("LiHo");
    const defaultMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(defaultMessage).toBeInTheDocument();
    fireEvent.click(koi);
    fireEvent.click(liHo);

    const populatedListing = getAllByText("Select Location First");
    populatedListing.map(shop => expect(shop).toBeInTheDocument());
    const populatedKois = getAllByAltText("Koi");
    populatedKois.map(store => expect(store).toBeInTheDocument());
    const populatedLiHos = getAllByAltText("LiHo");
    populatedLiHos.map(store => expect(store).toBeInTheDocument());
  });

  // negative test case
  test("when user chooses Tiger Sugar, Ten Ren does not show on listing", () => {
    const { queryAllByAltText, getByLabelText, getAllByAltText } = render(
      <App />
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    const tigerSugar = getByLabelText("Tiger Sugar");
    expect(storeMenu).toBeInTheDocument();
    fireEvent.click(tigerSugar);
    const populatedTigers = getAllByAltText("Tiger Sugar");
    populatedTigers.map(store => expect(store).toBeInTheDocument());
    const notChosenTenRen = queryAllByAltText("Ten Ren");
    expect(notChosenTenRen).toEqual([]);
  });
});

describe("test effect of NumberLimit menu", () => {
  test("shows only 2 shops when user selects to see 2 shops", () => {
    const { getByLabelText, getAllByAltText, getByTestId } = render(<App />);
    const locationSelect = getByLabelText("Where Are You?");
    const limitSelect = getByTestId("limit-select");
    const gongCha = getByLabelText("Gong Cha");
    fireEvent.click(gongCha);
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
  test("when 30 minutes and Tiger Sugar is selected, only 1 Tiger Sugar out of 2 will be populated", () => {
    const { getByLabelText, getAllByTestId, getAllByAltText } = render(<App />);
    const tigerSugar = getByLabelText("Tiger Sugar");
    const locationSelect = getByLabelText("Where Are You?");
    const waitingTimeSelect = getByLabelText("waiting time", { exact: false });

    fireEvent.click(tigerSugar);
    fireEvent.change(locationSelect, {
      target: { value: "Raffles Place MRT" }
    });

    const initialListing = getAllByAltText("Tiger Sugar");
    let numOfShops = 0;
    initialListing.map(shop => numOfShops++);
    expect(numOfShops).toEqual(2);

    fireEvent.change(waitingTimeSelect, { target: { value: "30" } });
    const waitingTimeColumn = getAllByTestId("waiting-time");
    waitingTimeColumn.map(time =>
      expect(
        parseInt(time.textContent.replace(" minutes", ""))
      ).not.toBeGreaterThan(30)
    );

    const finalListing = getAllByAltText("Tiger Sugar");
    let finalNumOfShops = 0;
    finalListing.map(shop => finalNumOfShops++);
    expect(finalNumOfShops).toEqual(1);
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
    const liHo = getByLabelText("LiHo");
    const locationSelect = getByLabelText("Where Are You?");
    fireEvent.click(liHo);
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

describe("test effects of all four filters - Store, Location, Number of Shop and Waiting Time", () => {
  test("when user selects Koi+GongCha/City Hall MRT/top 2 shops/10 minutes, will populate 2 Kois", () => {
    const {
      getByLabelText,
      getByTestId,
      getAllByAltText,
      getAllByTestId,
      queryAllByAltText
    } = render(<App />);
    const koi = getByLabelText("Koi");
    const gongCha = getByLabelText("Gong Cha");
    const locationSelect = getByLabelText("Where Are You?");
    const limitSelect = getByTestId("limit-select");
    const waitingTimeSelect = getByLabelText("waiting time", { exact: false });

    fireEvent.click(koi);
    fireEvent.click(gongCha);
    fireEvent.change(locationSelect, { target: { value: "City Hall MRT" } });
    fireEvent.change(limitSelect, { target: { value: 2 } });
    fireEvent.select(waitingTimeSelect, { target: { value: 10 } });

    const waitingTimeColumn = getAllByTestId("waiting-time");
    waitingTimeColumn.map(time =>
      expect(
        parseInt(time.textContent.replace(" minutes", ""))
      ).not.toBeGreaterThan(10)
    );

    const populatedKois = getAllByAltText("Koi");
    populatedKois.map(store => expect(store).toBeInTheDocument);
    const populatedGongChas = queryAllByAltText("Gong Cha");
    populatedGongChas.map(store => expect(store).toBeInTheDocument);
    expect(populatedGongChas).toEqual([]);
    const distances = getAllByTestId("distance");
    for (let i = 1; i < distances.length; i++) {
      expect(parseFloat(distances[i].textContent)).toBeGreaterThanOrEqual(
        parseFloat(distances[i - 1].textContent)
      );
    }

    let numOfShops = 0;
    populatedKois.map(shop => numOfShops++);

    expect(numOfShops).toEqual(2);
  });
});