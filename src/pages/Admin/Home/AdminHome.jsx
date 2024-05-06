import React, { useEffect, useState } from "react";
import {
  blockUnblockUser,
  fetchAllUsers,
} from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../../../components/admin/Header/AdminHeader";
import AdminSideBar from "../../../components/admin/Sidebar/AdminSideBar";

const AdminHome = () => {
  return (
    <>
      <AdminHeader choice={"profile"} />
      <AdminSideBar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white">WELCOME TO ADMIN DASHBOARD</h1>
      </div>
    </>
  );
};

export default AdminHome;
