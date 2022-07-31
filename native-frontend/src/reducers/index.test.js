import { IS_AUTHENTICATED, SHOW_LOADING } from "../actions/types";
import rootReducer from "./index";
import IsLoggedInReducer from "./reducer-is-logged-in";
import ShowLoadingReducer from "./reducer-show-loading";

describe("Root Reducer", () => {
  it("Should return the object", () => {
    expect(rootReducer).toEqual(rootReducer);
  });
});

describe("isLoggedIn Reducer", () => {
  it("Should return default state", () => {
    const newState = IsLoggedInReducer(undefined, {});
    expect(newState).toEqual(false);
  });

  it("Should return new state if receiving type IS_AUTHENTICATED", () => {
    const newState = IsLoggedInReducer(undefined, {
      type: IS_AUTHENTICATED,
      payload: true,
    });
    expect(newState).toEqual(true);
  });
});

describe("showLoading Reducer", () => {
  it("Should return default state", () => {
    const newState = ShowLoadingReducer(undefined, {});
    expect(newState).toEqual(true);
  });

  it("Should return new state if receiving type SHOW_LOADING", () => {
    const newState = ShowLoadingReducer(undefined, {
      type: SHOW_LOADING,
      payload: false,
    });
    expect(newState).toEqual(false);
  });
});
