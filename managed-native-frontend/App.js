import { Provider } from "react-redux";
import App from "./src/App";
import store from "./store";

export default function AppEntry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
