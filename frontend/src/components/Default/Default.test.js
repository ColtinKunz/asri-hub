import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Default from "./Default";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

jest.mock("../../actions", () => {});

configure({ adapter: new Adapter() });

describe("(Component) Default", () => {
  it("Should render Default component properly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Default logout={jest.fn()} />
      </Provider>
    );
  });

  it("Should logout on button click", () => {
    const logoutMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Default logout={logoutMock} />
      </Provider>
    );

    const btn = wrapper.find("#logout-button").first();
    btn.simulate("click");

    expect(logoutMock).toBeCalled();
  });
});
