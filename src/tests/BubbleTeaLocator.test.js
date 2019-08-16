import React from "react";
import BubbleTeaLocator from "../components/Find-A-Shop/BubbleTeaLocator";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockJwt = () => {
  const mockJwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYWxseUBnbWFpbC5jb20iLCJ1c2VyIjoiU2FsbHkiLCJpYXQiOjE1NjM4NTk5NjcyMDUsImV4cCI6MTU2Mzg1OTk3MDgwNX0.rC3dnj_r-mhL1tp3hj9JecjOpuZFrVY64SPSpS1fBPQ";

  jest
    .spyOn(window.sessionStorage.__proto__, "getItem")
    .mockReturnValue(mockJwtToken);
};

describe("test starting UI", () => {
  test("default UI should contain prompt message ", async () => {
    mockJwt();
    const history = createMemoryHistory({
      initialEntries: ["/find-a-shop"]
    });
    const { getByText, getByTestId, getByLabelText } = await render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
  test("when user chooses Any Store, listing populates", () => {
    const history = createMemoryHistory({
      initialEntries: ["/find-a-shop"]
    });
    const { getByLabelText, getAllByText, getAllByAltText, getByText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
    const storeMenu = getByLabelText("Which Store(s)?");
    expect(storeMenu).toBeInTheDocument();
    const checkBox = getByLabelText("Any Store");
    const defaultMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(defaultMessage).toBeInTheDocument();

    fireEvent.click(checkBox);
    const populatedListing = getAllByText("Select Location First");
    populatedListing.map(shop => expect(shop).toBeInTheDocument());

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
    const history = createMemoryHistory({
      initialEntries: ["/find-a-shop"]
    });
    const { getByLabelText, getAllByAltText, getByText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );

    const anyStore = getByLabelText("Any Store");

    fireEvent.click(anyStore);
    fireEvent.click(anyStore);
    const promptMessage = getByText(
      "Select the store you like and your location!"
    );
    expect(promptMessage).toBeInTheDocument();
  });

  test("when user chooses Koi and LiHo, Koi and LiHo shops show on listing", () => {
    const history = createMemoryHistory({
      initialEntries: ["/find-a-shop"]
    });
    const { getByLabelText, getAllByText, getAllByAltText, getByText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const { queryAllByAltText, getByLabelText, getAllByAltText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const { getByLabelText, getAllByAltText, getByTestId } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const { getByLabelText, getAllByTestId, getAllByAltText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });

    const { getByLabelText, getByText } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const { getByLabelText, getAllByAltText, getAllByTestId } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const {
      getByLabelText,
      getByTestId,
      getAllByAltText,
      getAllByTestId,
      queryAllByAltText
    } = render(
      <Router history={history}>
        <BubbleTeaLocator />
      </Router>
    );
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
