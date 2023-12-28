import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./services/routes.jsx";
import { store } from "./utils/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AppRouter />
    </Provider> 
);
