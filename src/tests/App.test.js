import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import App from "../components/App";
import { createMemoryHistory } from "history";

describe("test navigation", () => {
  test("App renders home and category links, and I can navigate to bubble-tea", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId, queryByTestId, getByText } = render(
      <App history={history} />
    );

    expect(getByTestId("home-page")).toBeInTheDocument();
    expect(queryByTestId("bubble-tea-locator-page")).not.toBeInTheDocument();
    fireEvent.click(getByText(/bubble tea/i));
    expect(getByTestId("bubble-tea-locator-page")).toBeInTheDocument();
    expect(queryByTestId("home-page")).not.toBeInTheDocument();
  });

  test("I can navigate to bargain shop page which is under construction", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId, queryByTestId, getByText } = render(
      <App history={history} />
    );
    expect(getByTestId("home-page")).toBeInTheDocument();
    expect(queryByTestId("under-construction")).not.toBeInTheDocument();
    fireEvent.click(getByText(/valudollar/i, { exact: false }));
    expect(getByTestId("under-construction")).toBeInTheDocument();
    expect(queryByTestId("home-page")).not.toBeInTheDocument();
  });
});

test.only("landing on a bad page shows no match component", () => {
  const history = createMemoryHistory({
    initialEntries: ["/something-that-does-not-match"]
  });
  const { getByTestId, getByText, debug } = render(<App history={history} />);
  debug();
  expect(getByText("Page Not Found")).toBeInTheDocument();
  expect(getByTestId("page-not-found")).toBeInTheDocument();
});
