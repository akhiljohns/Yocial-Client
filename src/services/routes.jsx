import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/////////////////////////USER PAGES/////////////////////////
import Login from "../pages/User/Login/Login";
import Error from "../pages/Error/Error";
import Register from "../pages/User/Register/Register";
import UserHome from "../pages/User/Home/Home";
import Protect from "../components/Protect/UserProtect";
import Profile from "../pages/User/Profile/Profile";

/////////////////////////ADMIN PAGES/////////////////////////
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminProtect from "../components/Protect/AdminProtect";
import AdminUsers from "../pages/Admin/Users/AdminUsers";
import AdminPosts from "../pages/Admin/Posts/Posts";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/:username"
          element={
            <Protect>
              <Profile />
            </Protect>
          }
        />
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <Protect>
              <UserHome />
            </Protect>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        
        <Route path="/admin/home"  element={<AdminProtect> <AdminHome /> </AdminProtect>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
