import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import AppRouter from "./services/User/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AppRouter />
    </Provider> 
);
