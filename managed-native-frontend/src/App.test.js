/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import App from "./App";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ showLoading: false, isLoggedIn: true });

jest.spyOn(Alert, "alert");
jest.mock("./actions", () => {});

describe("<App />", () => {
  it("Renders correctly", () => {
    const { toJSON } = render(
      <Provider store={store}>
        <App
          showLoading={jest.fn()}
          refreshAccessToken={jest.fn()}
          isLoggedIn={true}
        />
      </Provider>
    );
    const page = toJSON();
    expect(page.children.length).toBe(3);
  });
});
