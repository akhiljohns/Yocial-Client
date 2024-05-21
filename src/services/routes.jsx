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
import EditProfile from "../pages/User/EditProfile/EditProfile";
import AuthEmail from "../components/user/EditProfile/AuthEmail";
import SavedPosts from "../pages/User/SavedPosts/SavedPosts";
import SearchUsers from "../pages/User/Search/SearchUsers";
import MessageBox from "../pages/User/Message/MessageBox";
import SinglePostPage from "../pages/User/Posts/SinglePostPage";
/////////////////////////ADMIN PAGES/////////////////////////
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminProtect from "../components/Protect/AdminProtect";
import AdminUsers from "../pages/Admin/Users/AdminUsers";
import AdminPosts from "../pages/Admin/Posts/Posts";
import AdminReports from "../pages/Admin/Reports/Reports";
import VideoCallInterface from "../pages/User/VideoCall/VideoCallInterface";
import SocketHandler from "./User/SocketHandler";
const AppRouter = () => {
  return (
    <Router>
        <SocketHandler />
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
        <Route path="/savedposts" element={<SavedPosts />} />
        <Route path="/searchusers" element={<SearchUsers />} />
        <Route path="/auth/verify/:id/:token/:type" element={<AuthEmail />} />
        <Route path="/chat" element={<MessageBox />} />
        <Route path="/post/:postId" element={<SinglePostPage/>} />
        <Route path="/room/:roomId" element={<VideoCallInterface />} />

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
        <Route path="/admin/reports" element={<AdminReports />} />
        
        <Route path="/admin/home"  element={<AdminProtect> <AdminHome /> </AdminProtect>}/>
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
