import * as React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { mount, configure } from "enzyme";
import App from "./App";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store = mockStore({ showLoadingWheel: true, isLoggedIn: true });

jest.mock("./actions", () => {});

configure({
  adapter: new Adapter(),
});

describe("<App />", () => {
  it("Should render loading wheel", () => {
    const wrapper = mount(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );
  });

  it("Should render routes", () => {
    store = mockStore({ showLoadingWheel: false, isLoggedIn: true });
    const wrapper = mount(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );
  });

  it("Should redirect to login", () => {
    store = mockStore({ showLoadingWheel: false, isLoggedIn: false });
    const wrapper = mount(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );
  });

  it("Should redirect from login screen", () => {
    store = mockStore({ showLoadingWheel: false, isLoggedIn: true });
    const wrapper = mount(
      <Provider store={store}>
        <App refreshAccessToken={jest.fn()} />
      </Provider>
    );
  });
});
