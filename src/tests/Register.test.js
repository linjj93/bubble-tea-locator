import React from "react";
import Register from "../components/Register";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import mockAxios from "jest-mock-axios";

describe("default UI", () => {
  it("should render registration form", () => {
    const { getByLabelText, getByText } = render(<Register />);
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("should allow user to fill in values", () => {
    const { getByLabelText, getByDisplayValue } = render(<Register />);
    const usernameInput = getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "user1" } });
    expect(getByDisplayValue("user1")).toBeInTheDocument();
  });
});

describe("registration functionality", () => {
  it("should allow user registration", () => {
    const { getByText } = render(<Register />);

    const signUpBtn = getByText("Sign Up");
    fireEvent.click(signUpBtn);
    mockAxios.mockResponse();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
});
