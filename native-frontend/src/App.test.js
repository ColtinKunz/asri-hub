/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render } from "@testing-library/react-native";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import App from "./App";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store = mockStore({ showLoading: true, isLoggedIn: true });

jest.mock("./actions", () => {});
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("<App />", () => {
  it("Renders correctly with showLoading", () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );
    expect(getByTestId("loading")).not.toBeNull();
  });

  it("Renders correctly without showLoading", () => {
    jest.useFakeTimers();
    store = mockStore({ showLoading: false, isLoggedIn: true });
    const { getByText } = render(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );

    expect(getByText("Edit src/App.js and save to reload.")).not.toBeNull();
  });

  it("Renders correctly without being logged in", () => {
    jest.useFakeTimers();
    store = mockStore({ showLoading: false, isLoggedIn: false });
    const { getByTestId } = render(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );

    expect(getByTestId("username")).not.toBeNull();
  });
});
