/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Login from "./Login";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ showLoading: false, isLoggedIn: true });

jest.spyOn(Alert, "alert");
jest.mock("../../actions", () => {});

describe("<App />", () => {
  it("Can login", () => {
    const mockAuthenticate = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Login authenticate={mockAuthenticate} />
      </Provider>
    );
    const username = getByTestId("username");
    const password = getByTestId("password");
    const button = getByTestId("button");

    fireEvent.changeText(username, "user");
    fireEvent.changeText(password, "pass");

    fireEvent.press(button);
    expect(mockAuthenticate).toHaveBeenCalled();
  });

  it("Cannot login with empty username", () => {
    const mockAuthenticate = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Login authenticate={mockAuthenticate} />
      </Provider>
    );
    const username = getByTestId("username");
    // const password = getByTestId("password");
    const button = getByTestId("button");

    fireEvent.changeText(username, "user");

    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Login Error",
      "Password cannot be blank.",
      [{ text: "OK", style: "cancel" }],
      { cancelable: true }
    );
  });

  it("Cannot login with empty password", () => {
    const mockAuthenticate = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Login authenticate={mockAuthenticate} />
      </Provider>
    );
    // const username = getByTestId("username");
    const password = getByTestId("password");
    const button = getByTestId("button");

    fireEvent.changeText(password, "pass");

    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Login Error",
      "Password cannot be blank.",
      [{ text: "OK", style: "cancel" }],
      { cancelable: true }
    );
  });
});
