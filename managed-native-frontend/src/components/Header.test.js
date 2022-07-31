/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Header from "./Header";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ showLoading: false, isLoggedIn: true });

jest.spyOn(Alert, "alert");

describe("<Header />", () => {
  it("Renders correctly", () => {
    const { toJSON } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const page = toJSON();
    expect(page.children.length).toBe(3);
  });
});
