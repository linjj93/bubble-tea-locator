import React from "react";
import Login from "../components/Login";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import { Router } from "react-router-dom";
import mockAxios from "jest-mock-axios";
import { createMemoryHistory } from "history";

const mockHistory = {
  push: jest.fn()
};

const history = createMemoryHistory({
  initialEntries: ["/"]
});

const mockJwt = () => {
  const mockJwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDIzNjAzN2JkMmJmMTAwMTdlMTBhNGMiLCJpYXQiOjE1NjU5NDM3OTY4ODYsInVzZXIiOiJsaW5qajkzIiwiZXhwIjoxNTY1OTQzODA3Njg2fQ.A3RFy3fn4ssbfKixcWoI-K5Eav-3JC6Sy6L-1vL7HdM";

  jest
    .spyOn(window.sessionStorage.__proto__, "getItem")
    .mockReturnValue(mockJwtToken);
};

describe("default UI", () => {
  it("should show username and password box", () => {
    const { getByLabelText } = render(
      <Router history={history}>
        <Login />
      </Router>
    );
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should allow user to fill in values", () => {
    const { getByLabelText, getByDisplayValue } = render(
      <Router history={history}>
        <Login />
      </Router>
    );
    const usernameInput = getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "user1" } });
    expect(getByDisplayValue("user1")).toBeInTheDocument();
  });
});

describe("login functionality", () => {
  it("should allow user login", () => {
    const { getByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    );
    const loginBtn = getByText("Login");
    fireEvent.click(loginBtn);
    mockAxios.mockResponse({ data: { username: "hello", message: "hello" } });
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
});
