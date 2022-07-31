/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Default from "./Default";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store = mockStore({ showLoading: true, isLoggedIn: true });

jest.mock("../../actions", () => {});

describe("<Default />", () => {
  it("Renders correctly", () => {
    const { toJSON } = render(
      <Provider store={store}>
        <Default />
      </Provider>
    );
    const page = toJSON();
    expect(page.children.length).toBe(3);
  });

  it("Correctly redirect if not logged in", () => {
    store = mockStore({ showLoading: false, isLoggedIn: false });
    const logoutMock = jest.fn();
    const navigateMock = jest.fn();
    const rendered = render(
      <Provider store={store}>
        <Default logout={logoutMock} navigation={{ navigate: navigateMock }} />
      </Provider>
    );

    expect(navigateMock).toHaveBeenCalled();
  });

  it("Can press link", () => {
    store = mockStore({ showLoading: false, isLoggedIn: true });
    const logoutMock = jest.fn();
    const navigateMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Default logout={logoutMock} navigation={{ navigate: navigateMock }} />
      </Provider>
    );

    fireEvent.press(getByText("Learn React"));
  });

  it("Correctly logout", () => {
    store = mockStore({ showLoading: false, isLoggedIn: true });
    const logoutMock = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Default logout={logoutMock} />
      </Provider>
    );

    fireEvent.press(getByTestId("logoutButton"));
    expect(logoutMock).toHaveBeenCalled();
  });
});
