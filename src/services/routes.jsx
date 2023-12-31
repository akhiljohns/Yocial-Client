import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/////////////////////////USER PAGES/////////////////////////
import Login from "../pages/User/Login/Login";
import Error from "../pages/Error/Error";
import Register from "../pages/User/Register/Register";
import Home from "../pages/User/Home/Home";
import Protect from "../components/protect/Protect";
import Profile from "../pages/User/Profile/Profile";

/////////////////////////ADMIN PAGES/////////////////////////
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminProtect from "../components/protect/AdminProtect";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminProtect><AdminHome /></AdminProtect>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
