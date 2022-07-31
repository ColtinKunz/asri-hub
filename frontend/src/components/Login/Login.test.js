import React from "react";
import { TextField } from "@material-ui/core";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Login from "./Login";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

configure({ adapter: new Adapter() });

jest.mock("../../actions", () => {});

describe("(Component) Login", () => {
  it("Should render Login component properly", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login authenticate={jest.fn()} />
        </Provider>
      </MemoryRouter>
    );
  });

  it("Should error on login with no username and password", () => {
    const authenticateMock = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login authenticate={authenticateMock} />
        </Provider>
      </MemoryRouter>
    );

    const btn = wrapper.find("#login-button").first();
    btn.simulate("click");

    expect(window.alert).toBeCalledWith("Username cannot be blank.");
  });

  it("Should error on login with no password", () => {
    const authenticateMock = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login authenticate={authenticateMock} />
        </Provider>
      </MemoryRouter>
    );

    wrapper
      .find(TextField)
      .at(0)
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "username" } });

    const btn = wrapper.find("#login-button").first();
    btn.simulate("click");

    expect(window.alert).toBeCalledWith("Password cannot be blank.");
  });

  it("Should login with username and password", () => {
    const authenticateMock = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Login authenticate={authenticateMock} />
        </Provider>
      </MemoryRouter>
    );

    wrapper
      .find(TextField)
      .at(0)
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "username" } });

    wrapper
      .find(TextField)
      .at(1)
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "password" } });

    const btn = wrapper.find("#login-button").first();
    btn.simulate("click");

    expect(authenticateMock).toBeCalled();
  });
});
