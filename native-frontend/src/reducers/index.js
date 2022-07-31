import { combineReducers } from "redux";
import IsLoggedInReducer from "./reducer-is-logged-in";
import ShowLoadingReducer from "./reducer-show-loading";

const rootReducer = combineReducers({
  isLoggedIn: IsLoggedInReducer,
  showLoading: ShowLoadingReducer,
});

export default rootReducer;
