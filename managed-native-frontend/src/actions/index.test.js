import configureMockStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import * as actions from "./index";
import { IS_AUTHENTICATED, SHOW_LOADING } from "./types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore({ isLoggedIn: false, showLoading: true });

describe("Actions", () => {
  jest.setTimeout(10000);
  beforeEach(() => {
    store.clearActions();
  });

  it("authenticate success", (done) => {
    mock.onPost("auth/login/").reply(200, {});
    store
      .dispatch(
        actions.authenticate("username", "password", { navigate: jest.fn() })
      )
      .then(() => {
        const expectedActions = [{ type: IS_AUTHENTICATED, payload: true }];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("authenticate failure", (done) => {
    mock.onPost("auth/login/").reply(500, {});
    store
      .dispatch(
        actions.authenticate(
          "username",
          "password",
          { navigate: jest.fn() },
          jest.fn()
        )
      )
      .then(() => {
        const expectedActions = [{ type: IS_AUTHENTICATED, payload: false }];
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("verifyAccessToken success", (done) => {
    mock.onPost("auth/verify/").reply(200, {});
    store.dispatch(actions.verifyAccessToken()).then(() => {
      const expectedActions = [{ type: IS_AUTHENTICATED, payload: true }];
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("verifyAccessToken failure", (done) => {
    mock.onPost("auth/verify/").reply(400, {});
    store.dispatch(actions.verifyAccessToken(false)).then(() => {
      const expectedActions = [{ type: IS_AUTHENTICATED, payload: false }];
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("logout success", (done) => {
    mock.onPost("auth/logout/").reply(200, {});
    store.dispatch(actions.logout()).then(() => {
      const expectedActions = [{ type: IS_AUTHENTICATED, payload: false }];
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("logout failure", (done) => {
    mock.onPost("auth/logout/").reply(400, {});
    store.dispatch(actions.logout()).then(() => {
      const expectedActions = [{ type: IS_AUTHENTICATED, payload: false }];
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
