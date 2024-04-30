import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import EditProfile from "../pages/User/EditProfile/EditProfile";
import AuthEmail from "../components/user/EditProfile/AuthEmail";
import SavedPosts from "../pages/User/SavedPosts/SavedPosts";
import SearchUsers from "../pages/User/Search/SearchUsers";
import MessageBox from "../pages/User/Message/MessageBox";
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
        <Route path="/editprofile/:username" element={<EditProfile />} />
        <Route path="/:username" element={<EditProfile />} />
        <Route path="/savedposts" element={<SavedPosts />} />
        <Route path="/searchusers" element={<SearchUsers />} />
        <Route path="/auth/verify/:id/:token/:type" element={<AuthEmail />} />
        <Route path="/chat" element={<MessageBox />} />

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
        <Route
          path="/admin/home"
          element={
            <AdminProtect>
              <AdminHome />
            </AdminProtect>
          }
        />
      </Routes>
      <ToastContainer
        pauseOnFocusLoss={false}
        newestOnTop
        rtl={false}
        transition={Flip}
      />
    </Router>
  );
};

export default AppRouter;
