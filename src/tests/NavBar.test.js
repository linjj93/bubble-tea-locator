import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import NavBar from "../components/NavBar";
import { render } from "@testing-library/react";

describe("rendering of navigation bar", () => {
  test("renders Nav Bar with text", () => {
    const { getByText } = render(<NavBar />);
    const nav = getByText("navigation");
    expect(nav).toBeInTheDocument();
  });

  test("navigation bar consists of links to other pages", () => {
    const { getByText } = render(<NavBar />);
    const firstLink = getByText("Bubble Tea");
    expect(firstLink).toBeInTheDocument();
  });
});
