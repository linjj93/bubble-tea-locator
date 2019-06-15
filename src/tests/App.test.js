import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import App from "../components/App";
import { createMemoryHistory } from "history";

test("App renders home and bubble tea locator and I can navigate to those pages", () => {
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

test("landing on a bad page shows no match component", () => {
  const history = createMemoryHistory({
    initialEntries: ["/something-that-does-not-match"]
  });
  const { getByTestId } = render(<App history={history} />);
  expect(getByTestId("error-page")).toBeInTheDocument();
});
