import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../pages/User/Login/Login";
import Error from "../pages/Error/Error";
import Register from "../pages/User/Register/Register";
import Home from "../pages/User/Home/Home";
import Protect from "../components/protect/Protect";
import Profile from "../pages/User/Profile/Profile";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
