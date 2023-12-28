import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../pages/User/Login/Login";
import App from "../App";
import Error from "../pages/Error/Error";
import Register from "../pages/User/Register/Register";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
