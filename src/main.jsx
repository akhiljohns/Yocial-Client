import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import AppRouter from "./services/routes";
import ErrorBoundary from "./components/user/Error/ErrorBoundary";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </Provider>
);
