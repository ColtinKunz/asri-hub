import { IS_AUTHENTICATED, SHOW_LOADING_WHEEL } from "../actions/types";
import isLoggedInReducer from "./is-logged-in-reducer";
import showLoadingWheelReducer from "./show-loading-wheel-reducer";
import { rootReducer } from "./index";

describe("isLoggedIn Reducer", () => {
  it("Should return default state", () => {
    const newState = isLoggedInReducer(undefined, {});
    expect(newState).toEqual(false); // default state is false
  });

  it("Should return new state if receiving IS_LOGGED_IN", () => {
    const newState = isLoggedInReducer(undefined, {
      type: IS_AUTHENTICATED,
      payload: true,
    });
    expect(newState).toEqual(true);
  });
});

describe("showLoadingWheel Reducer", () => {
  it("Should return default state", () => {
    const newState = showLoadingWheelReducer(undefined, {});
    expect(newState).toEqual(true); // default state is true
  });

  it("Should return new state if receiving SHOW_LOADING_WHEEL", () => {
    const newState = showLoadingWheelReducer(undefined, {
      type: SHOW_LOADING_WHEEL,
      payload: true,
    });
    expect(newState).toEqual(true);
  });
});

describe("Root Reducer", () => {
  it("Should return default state", () => {
    expect(rootReducer).toEqual(rootReducer);
  });
});
